import axios from 'axios';

const fallbackApiUrl = '/api';

export const API_URL = import.meta.env.VITE_API_URL || fallbackApiUrl;
export const API_ORIGIN = API_URL.endsWith('/api')
  ? API_URL.slice(0, -4)
  : API_URL.replace(/\/$/, '');

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || '';
    
    // Check if this is an auth-related endpoint
    const isAuthEndpoint = requestUrl.includes('/auth/login') || 
                          requestUrl.includes('/auth/register') ||
                          requestUrl.includes('/auth/refresh');

    // Only clear tokens on login failures, not on other 401s
    if (requestUrl.includes('/auth/login') && error.response?.status === 401) {
      console.log('❌ Login failed - invalid credentials');
      // Don't clear tokens here - let the login component handle it
      throw error;
    }

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          console.log('⚠️ No refresh token available, cannot refresh');
          throw new Error('No refresh token');
        }

        console.log('🔄 Attempting token refresh via API interceptor...');
        // Try to refresh the token - send refreshToken in Authorization header
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          {}, // Empty body
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}`, // Send in header
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        console.log('✅ Token refreshed successfully via API interceptor');
        console.log('🔑 New access token (first 20 chars):', accessToken.substring(0, 20));

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log('🔄 Retrying original request:', originalRequest.url);
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Only logout if the refresh endpoint itself returned 401
        const isRefreshEndpoint401 = axios.isAxiosError(refreshError) && 
                                     refreshError.response?.status === 401 &&
                                     refreshError.config?.url?.includes('/auth/refresh');
        
        if (isRefreshEndpoint401) {
          console.error('❌ Refresh token expired or invalid - logging out');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          globalThis.window.location.href = '/authentication/sign-in';
        } else {
          console.error('❌ Token refresh failed (network or other error):', refreshError);
          // Don't logout on network errors - just let the request fail
        }
        throw refreshError;
      }
    }

    // Don't automatically logout on 401 - only if refresh failed
    // This prevents logout on 404s or other non-auth 401s
    throw error;
  }
);

export default apiClient;
