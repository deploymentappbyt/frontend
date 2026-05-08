import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { API_URL } from "services/api";

function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      console.log("✅ OAuth tokens received, storing and fetching user profile...");
      
      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Fetch complete user profile from the database
      fetch(`${API_URL}/auth/me`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((jwtData) => {
          console.log("✅ JWT data received:", jwtData);
          // Now fetch the full user data from the users endpoint
          const userId = jwtData.userId || jwtData.sub;
          return fetch(`${API_URL}/users/${userId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })
        .then((res) => res.json())
        .then((fullUserData) => {
          console.log("✅ Full user data received:", fullUserData);
          localStorage.setItem("user", JSON.stringify(fullUserData));
          console.log("✅ Redirecting to dashboard...");
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("❌ Failed to fetch user profile:", err);
          navigate("/authentication/sign-in?error=oauth_failed");
        });
    } else {
      console.log("⚠️ No OAuth tokens found in URL, redirecting to sign in");
      // No tokens, redirect to sign in
      navigate("/authentication/sign-in");
    }
  }, [searchParams, navigate]);

  return (
    <VuiBox
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)",
      }}
    >
      <VuiTypography variant="h4" color="white">
        Completing sign in...
      </VuiTypography>
    </VuiBox>
  );
}

export default OAuthCallback;
