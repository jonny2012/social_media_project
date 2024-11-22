import { Box, Container } from "@mui/material";
import { useGetAllPostsQuery } from "../../redux/RTKqueries/postQueries";
import SideMenu from "../sideMenu/SideMenu";
import ProfilePost from "../Post/ProfilePost";

export const ExplorePosts = ({ isOpenDrawer }: any) => {
  const { data: postData, error, isLoading } = useGetAllPostsQuery("");

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
            gap: "3px",
          }}
        >
          {postData &&
            postData.map((post: any, index: number) => (
              <ProfilePost key={post._doc._id} post={post._doc} />
            ))}
        </Box>
      </Container>
    </>
  );
};
