import React, { useState } from "react";
import { Box, Avatar, Typography, Button, Container } from "@mui/material";
import { useGetUserProfileQuery } from "../redux/RTKqueries/userQueries";
import SideMenu from "../modules/sideMenu/SideMenu";
import PostModal from "../modules/Post/PostModal";
import ProfilePost from "../modules/Post/ProfilePost";

function ProfileHeader() {
  const userId = localStorage.getItem("userId");
  const { data: profile, error, isLoading } = useGetUserProfileQuery(userId);
  const [file, setFile] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const userData = {
    username: profile?.username,
    profileImage: profile?.profileImage,
    _id: profile?._id,
  };
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <>
      <SideMenu />
      <Container
        sx={{
          maxWidth: 980,
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          gap: "40px",
          padding: 3,
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "70px",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt="image"
            src={`http://localhost:5000/avatar/${profile?.profileImage}`}
            sx={{
              width: 150,
              height: 150,
              border: "2px solid transparent",
              borderRadius: "50%",
              marginBottom: 1,
              backgroundImage:
                "linear-gradient(45deg, #FFDD55, #FF543E, #FF33A1, #C13584, #833AB4)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
            }}
          >
            {" "}
            <input
              type="file"
              style={{
                opacity: 0,
                position: "absolute",
                cursor: "pointer",
                width: "400px",
                height: "400px",
              }}
              onChange={handleFileChange}
            />
          </Avatar>
          <Box>
            <Box sx={{ display: "flex", gap: "40px" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500, marginBottom: 1, textAlign: "center" }}
              >
                {profile?.fullName}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  marginBottom: 2,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#EFEFEF",
                    color: "#000",
                    padding: "5px 30px",
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "300px",
                marginBottom: 2,
              }}
            >
              <Box sx={{ textAlign: "center", display: "flex", gap: "5px" }}>
                <Typography variant="body2" fontWeight="bold">
                  {profile?.posts.length}
                </Typography>
                <Typography
                  textAlign={"center"}
                  variant="caption"
                  color="textSecondary"
                >
                  posts
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", display: "flex", gap: "5px" }}>
                <Typography variant="body2" fontWeight="bold">
                  {profile?.follows?.length || 0}
                </Typography>
                <Typography
                  textAlign={"center"}
                  variant="caption"
                  color="textSecondary"
                >
                  followers
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", display: "flex", gap: "5px" }}>
                <Typography variant="body2" fontWeight="bold">
                  {profile?.following?.length}
                </Typography>
                <Typography
                  sx={{ textAlign: "center" }}
                  variant="caption"
                  color="textSecondary"
                >
                  following
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginBottom: 1, textAlign: "start" }}
            >
              <strong>Bio:</strong>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              cursor: "pointer",
              textAlign: "start",
              marginLeft: "120px",
              textDecoration: "none",
            }}
          >
            Posts
          </Typography>
          <Box
            sx={{
              display: "flex",
              maxWidth: "100%",
              flexWrap: "wrap",
              gap: "3px",
              justifyContent: "center",
            }}
          >
            {profile &&
              profile.posts.map((post: any) => (
                <ProfilePost key={post._id} post={post} user={userData} />
              ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ProfileHeader;
