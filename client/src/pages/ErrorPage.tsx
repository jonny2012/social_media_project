import { Box, Typography } from "@mui/material";

function ErrorPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        textAlign: "center",
        bgcolor: "#f8f9fa",
        padding: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <img
          src="./../assets//Background.jpg"
          alt="Instagram Mockup"
          style={{
            maxWidth: "100%",
            height: "auto",
            width: "300px",
          }}
        />
      </Box>

      {/* 404 Error Text */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
        Oops! Page Not Found (404 Error)
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", maxWidth: 600 }}
      >
        We're sorry, but the page you're looking for doesn't seem to exist. If
        you typed the URL manually, please double-check the spelling. If you
        clicked on a link, it may be outdated or broken.
      </Typography>
    </Box>
  );
}

export default ErrorPage;
