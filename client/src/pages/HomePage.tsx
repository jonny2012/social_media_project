import { Box, Container } from "@mui/material";
import { useGetAllPostsQuery } from "../redux/RTKqueries/postQueries";
import Post from "../modules/Post/Post";
import SideMenu from "../modules/sideMenu/SideMenu";
import Footer from "../modules/footer/Footer";

export const HomePage = () => {
  const { data: postData, error, isLoading, refetch } = useGetAllPostsQuery("");

  const userId = localStorage.getItem("userId");

  if (isLoading) return <Box>...Loading</Box>;
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "60px",
          width: "100vw",
        }}
      >
        <SideMenu />
        <Container
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            flex: 1,
            width: "900px",
          }}
        >
          {postData &&
            postData.map((post: any, index: number) => (
              <Box key={post._doc._id} sx={{ width: "100%", height: "auto" }}>
                <Post
                  postId={post._doc._id}
                  user={post._doc["userId"]}
                  imageUrl={post._doc.image}
                  likes={post._doc.likes}
                  isFollow={post.isFollow}
                  comments={post._doc.comments}
                  postRefetch={refetch}
                />
              </Box>
            ))}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
