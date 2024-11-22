import { Box, Container } from "@mui/material";
import { useGetAllPostsQuery } from "../redux/RTKqueries/postQueries";
import SideMenu from "../modules/sideMenu/SideMenu";
import ProfilePost from "../modules/Post/ProfilePost";

export const ExplorePosts = ({ isOpenDrawer }: any) => {
  const { data: postData, error, isLoading } = useGetAllPostsQuery("");
  console.log(postData);
  if (isLoading) return <Box>...Loading</Box>;
  return (
    <>
      <SideMenu />
      <Container sx={{ padding: 2 }}>
        <Box
          sx={{
            width: "957px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "5px",
          }}
        >
          {postData &&
            postData.map((post: any, index: number) => (
              <ProfilePost
                key={post._doc._id}
                post={post._doc}
                user={post._doc.userId}
              />
            ))}
        </Box>
      </Container>
    </>
  );
};
