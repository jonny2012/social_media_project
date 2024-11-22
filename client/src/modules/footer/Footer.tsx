import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container
      sx={{
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          width: "600px",
          justifySelf: "center",
        }}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>Search</Link>
        <Link to={"/explore"}>Explore</Link>
        <Link to={"/chat"}>Messages</Link>
        <Link to={"/notifications"}>Notifications</Link>
        <Link to={"/create"}>Create</Link>
      </Box>
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="caption"
      >
        {" "}
        2024 ICHGram
      </Typography>
    </Container>
  );
};

export default Footer;
