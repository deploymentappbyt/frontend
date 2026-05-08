import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { API_URL } from "services/api";
import { setUser } from "../../../store/slices/userSlice";
import { CircularProgress } from "@mui/material";

function OAuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Processing...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    console.log("🔍 OAuth Callback - Tokens present:", { 
      hasAccessToken: !!accessToken, 
      hasRefreshToken: !!refreshToken,
      apiUrl: API_URL 
    });

    if (accessToken && refreshToken) {
      setStatus("Storing tokens...");
      console.log("✅ OAuth tokens received, storing and fetching user profile...");
      
      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setStatus("Fetching user profile...");

      // Fetch complete user profile from the database
      fetch(`${API_URL}/auth/me`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("📡 /auth/me response status:", res.status);
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then((jwtData) => {
          console.log("✅ JWT data received:", jwtData);
          setStatus("Loading user data...");
          
          // Now fetch the full user data from the users endpoint
          const userId = jwtData.userId || jwtData.sub;
          console.log("👤 Fetching user data for ID:", userId);
          
          return fetch(`${API_URL}/users/${userId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })
        .then((res) => {
          console.log("📡 /users response status:", res.status);
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then((fullUserData) => {
          console.log("✅ Full user data received:", fullUserData);
          localStorage.setItem("user", JSON.stringify(fullUserData));
          
          // Update Redux store
          dispatch(
            setUser({
              id: fullUserData.id || fullUserData._id,
              username: fullUserData.username,
              email: fullUserData.email,
              role: fullUserData.role,
              avatar: fullUserData.profile?.avatar || fullUserData.providerAvatar,
              rank: fullUserData.statistics?.rank,
              points: fullUserData.statistics?.totalPoints,
            })
          );
          
          setStatus("Redirecting to dashboard...");
          console.log("✅ Redirecting to dashboard...");
          
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch user profile:", err);
          setError(err.message || "Failed to complete sign in");
          setStatus("Error occurred");
          
          setTimeout(() => {
            navigate("/authentication/sign-in?error=oauth_failed");
          }, 2000);
        });
    } else {
      console.log("⚠️ No OAuth tokens found in URL, redirecting to sign in");
      setStatus("No tokens found");
      // No tokens, redirect to sign in
      setTimeout(() => {
        navigate("/authentication/sign-in");
      }, 1000);
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <VuiBox
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)",
        gap: 3,
      }}
    >
      {!error && <CircularProgress size={60} sx={{ color: "#0075FF" }} />}
      
      <VuiTypography variant="h4" color="white" textAlign="center">
        {error ? "⚠️ Sign In Failed" : "🔐 Completing Sign In..."}
      </VuiTypography>
      
      <VuiTypography variant="body2" color="text" textAlign="center">
        {error || status}
      </VuiTypography>
      
      {error && (
        <VuiTypography variant="caption" color="error" textAlign="center" sx={{ mt: 2 }}>
          Redirecting to sign in page...
        </VuiTypography>
      )}
    </VuiBox>
  );
}

export default OAuthCallback;
