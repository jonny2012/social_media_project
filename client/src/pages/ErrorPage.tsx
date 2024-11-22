import { Box, Container, Typography } from "@mui/material";
import SideMenu from "../modules/sideMenu/SideMenu";

function ErrorPage() {
  return (
    <>
      <SideMenu />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",

          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "row",
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
          <Box
            sx={{
              width: "100%",
              height: "40vh",
              backgroundImage: `url('./../assets/image.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
        </Box>

        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Oops! Page Not Found (404 Error)
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 600 }}
          >
            We `re sorry, but the page you`re looking for doesn`t seem to exist.
            If you typed the URL manually, please double-check the spelling. If
            you clicked on a link, it may be outdated or broken.
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default ErrorPage;
