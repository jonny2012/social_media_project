import { Box } from "@mui/material";
import PostModal from "./PostModal";
import { useState } from "react";

const ProfilePost = ({ post }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  console.log(post);
  return (
    <>
      <Box
        onClick={() => setOpen(!open)}
        component="img"
        src={`http://localhost:5000/posts/${post.image}`}
        alt={`image-${post._id}`}
        sx={{
          width: "302px",
          height: "302px",
          objectFit: "fill",
          border: "1px solid #c0c0c0",
          cursor: "pointer",
        }}
      />
      <PostModal
        open={open}
        handleClose={setOpen}
        user={post.userId}
        postId={post._id}
        imageUrl={post.image}
        likes={post.likes.length}
      />
    </>
  );
};
export default ProfilePost;
