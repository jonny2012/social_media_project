import { useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import {
  useCheckFollowQuery,
  useGetUserProfileQuery,
  useUpdateUserFollowersMutation,
} from "../redux/RTKqueries/userQueries";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SideMenu from "../modules/sideMenu/SideMenu";
import PostModal from "../modules/Post/PostModal";
import ProfilePost from "../modules/Post/ProfilePost";

function ProfileTemplate() {
  const { id } = useParams();

  const {
    data: profile,
    error: userDataError,
    isLoading: dataLoading,
  } = useGetUserProfileQuery(id);
  const [follow, { data, error, isLoading }] = useUpdateUserFollowersMutation();

  const userData = {
    username: profile?.username,
    profileImage: profile?.profileImage,
    _id: profile?._id,
  };

  const {
    data: followData,
    error: folo,
    isLoading: followIsLoading,
  } = useCheckFollowQuery(id);

  if (dataLoading) return <Box>...Loading</Box>;
  return (
    <>
      <SideMenu />

      <Box
        sx={{
          maxWidth: 980,
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          gap: "40px",
          padding: 3,
          flexDirection: "column",
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
            alt="itcareerhub"
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
          />

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
                  onClick={() => follow({ folowerId: profile?._id })}
                  variant={
                    followData?.message === "Unfollow"
                      ? "outlined"
                      : "contained"
                  }
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  {followData?.message}
                </Button>
                <Link to={`/chat-room/${profile?._id}`}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ textTransform: "none" }}
                  >
                    Message
                  </Button>
                </Link>
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
            ></Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              cursor: "pointer",
              textAlign: "start",
              textDecoration: "none",
            }}
          >
            Posts
          </Typography>
          <Box
            sx={{
              display: "flex",
              maxWidth: "937px",
              flexWrap: "wrap",
              gap: "3px",
            }}
          >
            {profile &&
              profile.posts.map((post: any, i: number) => (
                <ProfilePost key={post._id} post={post} user={userData} />
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfileTemplate;
