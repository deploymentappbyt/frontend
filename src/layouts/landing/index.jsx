import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IoCodeSlash, IoTrophy, IoFlash, IoPeople, IoShield, IoRocket } from "react-icons/io5";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { authService } from "services/auth.service";
import { useVisionUIController } from "context";

function Landing() {
  const navigate = useNavigate();
  const [controller] = useVisionUIController();
  const { darkMode } = controller;

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const features = [
    {
      icon: <IoCodeSlash size="40px" />,
      title: "Real-Time Battles",
      description: "Compete against developers worldwide in live coding challenges",
    },
    {
      icon: <IoFlash size="40px" />,
      title: "AI-Generated Challenges",
      description: "Unlimited unique problems powered by machine learning",
    },
    {
      icon: <IoTrophy size="40px" />,
      title: "Tournaments",
      description: "Join scheduled competitions and climb the leaderboards",
    },
    {
      icon: <IoPeople size="40px" />,
      title: "Clan System",
      description: "Team up with other developers and compete together",
    },
    {
      icon: <IoShield size="40px" />,
      title: "Secure Platform",
      description: "Face ID authentication and sandboxed code execution",
    },
    {
      icon: <IoRocket size="40px" />,
      title: "Multi-Language",
      description: "Code in Python, JavaScript, Java, C++, and more",
    },
  ];

  return (
    <PageLayout>
      <VuiBox
        sx={{
          minHeight: "100vh",
          background: darkMode 
            ? "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          position: "relative",
          overflow: "hidden",
      }}
    >
      {/* Animated background particles */}
      <VuiBox
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: darkMode ? 0.05 : 0.3,
          background: darkMode 
            ? `
              radial-gradient(circle at 20% 50%, #667eea 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, #764ba2 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, #f093fb 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 50%, #667eea 0%, transparent 70%),
              radial-gradient(circle at 80% 80%, #764ba2 0%, transparent 70%),
              radial-gradient(circle at 40% 20%, #f093fb 0%, transparent 70%)
            `,
        }}
      />

      {/* Hero Section */}
      <VuiBox
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo/Brand */}
        <VuiBox sx={{ mb: 4 }}>
          <VuiTypography
            variant="h6"
            color="info"
            fontWeight="bold"
            sx={{
              fontSize: "1rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            ByteBattle Arena
          </VuiTypography>
        </VuiBox>

        {/* Main Headline */}
        <VuiTypography
          variant="h1"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
            mb: 3,
            color: darkMode ? "white" : "#1a202c",
            textShadow: darkMode ? "none" : "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          Code. Compete. Conquer.
        </VuiTypography>

        {/* Subheadline */}
        <VuiTypography
          variant="h5"
          sx={{
            mb: 5,
            maxWidth: "700px",
            fontSize: { xs: "1rem", md: "1.3rem" },
            lineHeight: 1.6,
            color: darkMode ? "rgba(255, 255, 255, 0.8)" : "#4a5568",
          }}
        >
          Master coding through real-time battles with developers worldwide.
          Challenge yourself, earn achievements, and climb the leaderboards.
        </VuiTypography>

        {/* CTA Buttons */}
        <VuiBox
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: "wrap",
            mb: 6,
          }}
        >
          <VuiButton
            color="info"
            size="large"
            onClick={() => navigate("/authentication/sign-up")}
            sx={{
              px: 5,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 8px 24px rgba(0, 117, 255, 0.4)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(0, 117, 255, 0.5)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Start Coding Now
          </VuiButton>

          <VuiButton
            variant="outlined"
            size="large"
            onClick={() => navigate("/authentication/sign-in")}
            sx={{
              px: 5,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.6)",
                background: "rgba(255, 255, 255, 0.05)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Sign In
          </VuiButton>
        </VuiBox>

        {/* Live Stats */}
        <VuiBox
          sx={{
            display: "flex",
            gap: { xs: 3, md: 6 },
            justifyContent: "center",
            flexWrap: "wrap",
            mt: 4,
          }}
        >
          {[
            { value: "10K+", label: "Active Developers" },
            { value: "50K+", label: "Challenges Completed" },
            { value: "24/7", label: "Live Battles" },
          ].map((stat, index) => (
            <VuiBox key={index} sx={{ textAlign: "center" }}>
              <VuiTypography
                variant="h3"
                color="info"
                fontWeight="bold"
                sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
              >
                {stat.value}
              </VuiTypography>
              <VuiTypography
                variant="caption"
                sx={{ 
                  fontSize: { xs: "0.8rem", md: "0.9rem" },
                  color: darkMode ? "rgba(255, 255, 255, 0.7)" : "#4a5568",
                }}
              >
                {stat.label}
              </VuiTypography>
            </VuiBox>
          ))}
        </VuiBox>

        {/* Scroll indicator */}
        <VuiBox
          sx={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
              "50%": { transform: "translateX(-50%) translateY(-10px)" },
            },
          }}
        >
          <VuiTypography 
            variant="caption" 
            sx={{ color: darkMode ? "rgba(255, 255, 255, 0.6)" : "#718096" }}
          >
            Scroll to explore
          </VuiTypography>
        </VuiBox>
      </VuiBox>

      {/* Features Section */}
      <VuiBox
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        <VuiTypography
          variant="h2"
          fontWeight="bold"
          sx={{ 
            mb: 2, 
            fontSize: { xs: "2rem", md: "3rem" }, 
            textAlign: "center",
            color: darkMode ? "white" : "#1a202c",
          }}
        >
          Why ByteBattle?
        </VuiTypography>

        <VuiTypography
          variant="body1"
          sx={{ 
            mb: 8, 
            maxWidth: "600px", 
            textAlign: "center", 
            fontSize: "1.1rem",
            color: darkMode ? "rgba(255, 255, 255, 0.7)" : "#4a5568",
          }}
        >
          Everything you need to level up your coding skills through competitive programming
        </VuiTypography>

        {/* Features Grid */}
        <VuiBox
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 4,
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {features.map((feature, index) => (
            <VuiBox
              key={index}
              sx={{
                background: darkMode 
                  ? "rgba(255, 255, 255, 0.05)" 
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: darkMode 
                  ? "1px solid rgba(255, 255, 255, 0.1)" 
                  : "1px solid rgba(203, 213, 225, 0.5)",
                borderRadius: "16px",
                p: 4,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  background: darkMode 
                    ? "rgba(255, 255, 255, 0.08)" 
                    : "rgba(255, 255, 255, 0.95)",
                  borderColor: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(102, 126, 234, 0.5)",
                  boxShadow: darkMode 
                    ? "0 12px 32px rgba(102, 126, 234, 0.2)" 
                    : "0 12px 32px rgba(102, 126, 234, 0.15)",
                },
              }}
            >
              <VuiBox sx={{ color: darkMode ? "#667eea" : "#667eea", mb: 2 }}>{feature.icon}</VuiBox>
              <VuiTypography variant="h5" fontWeight="bold" sx={{ mb: 1, color: darkMode ? "white" : "#1a202c" }}>
                {feature.title}
              </VuiTypography>
              <VuiTypography 
                variant="body2" 
                sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : "#4a5568" }}
              >
                {feature.description}
              </VuiTypography>
            </VuiBox>
          ))}
        </VuiBox>
      </VuiBox>

      {/* How It Works Section */}
      <VuiBox
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        <VuiTypography
          variant="h2"
          fontWeight="bold"
          sx={{ mb: 2, fontSize: { xs: "2rem", md: "3rem" }, textAlign: "center", color: darkMode ? "white" : "#1a202c" }}
        >
          How It Works
        </VuiTypography>

        <VuiTypography
          variant="body1"
          sx={{ 
            mb: 8, 
            maxWidth: "600px", 
            textAlign: "center", 
            fontSize: "1.1rem",
            color: darkMode ? "rgba(255, 255, 255, 0.7)" : "#4a5568",
          }}
        >
          Get started in minutes and begin your coding journey
        </VuiTypography>

        {/* Steps */}
        <VuiBox
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            maxWidth: "1000px",
            width: "100%",
          }}
        >
          {[
            { step: "1", title: "Sign Up", desc: "Create your account with email or OAuth" },
            { step: "2", title: "Choose Challenge", desc: "Pick difficulty and programming language" },
            { step: "3", title: "Battle", desc: "Code against opponents in real-time" },
            { step: "4", title: "Win & Rank Up", desc: "Earn points and climb leaderboards" },
          ].map((item, index) => (
            <VuiBox
              key={index}
              sx={{
                flex: 1,
                textAlign: "center",
                position: "relative",
              }}
            >
              <VuiBox
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {item.step}
              </VuiBox>
              <VuiTypography variant="h5" fontWeight="bold" sx={{ mb: 1, color: darkMode ? "white" : "#1a202c" }}>
                {item.title}
              </VuiTypography>
              <VuiTypography 
                variant="body2" 
                sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : "#4a5568" }}
              >
                {item.desc}
              </VuiTypography>
            </VuiBox>
          ))}
        </VuiBox>
      </VuiBox>

      {/* Final CTA Section */}
      <VuiBox
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 10,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <VuiTypography
          variant="h2"
          fontWeight="bold"
          sx={{ mb: 3, fontSize: { xs: "2rem", md: "3rem" }, color: darkMode ? "white" : "#1a202c" }}
        >
          Ready to Start Your Coding Journey?
        </VuiTypography>

        <VuiTypography
          variant="body1"
          sx={{ 
            mb: 5, 
            maxWidth: "600px", 
            fontSize: "1.1rem",
            color: darkMode ? "rgba(255, 255, 255, 0.7)" : "#4a5568",
          }}
        >
          Join thousands of developers improving their skills through competitive programming
        </VuiTypography>

        <VuiButton
          color="info"
          size="large"
          onClick={() => navigate("/authentication/sign-up")}
          sx={{
            px: 6,
            py: 2.5,
            fontSize: "1.2rem",
            fontWeight: "bold",
            boxShadow: "0 8px 24px rgba(0, 117, 255, 0.4)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 32px rgba(0, 117, 255, 0.5)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Get Started Free
        </VuiButton>
      </VuiBox>

      {/* Footer */}
      <VuiBox
        sx={{
          borderTop: darkMode 
            ? "1px solid rgba(255, 255, 255, 0.1)" 
            : "1px solid rgba(203, 213, 225, 0.3)",
          py: 4,
          px: 3,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <VuiTypography 
          variant="body2" 
          sx={{ color: darkMode ? "rgba(255, 255, 255, 0.6)" : "#718096" }}
        >
          © 2026 ByteBattle. All rights reserved.
        </VuiTypography>
      </VuiBox>
    </VuiBox>
    </PageLayout>
  );
}

export default Landing;
