import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  useCreatePostCommentsMutation,
  useGetAllPostCommentsQuery,
} from "../../redux/RTKqueries/postQueries";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link } from "react-router-dom";

const PostModal = ({
  open,
  handleClose,
  postId,
  imageUrl,
  likes,
  user,
}: any) => {
  const userId = sessionStorage.getItem("userId");

  const commentsEndRef = useRef<any>(null);
  const [newComment, setNewComment] = useState<any>();
  const [comments, setComments] = useState<any>();
  const [
    createComment,
    { data: commentData, error: commentError, isLoading: commentIsLoading },
  ] = useCreatePostCommentsMutation();
  const {
    data: commentsData,
    error,
    isLoading,
    refetch,
  } = useGetAllPostCommentsQuery(postId);

  useEffect(() => {
    if (open) {
      refetch();
    }

    setComments(commentsData);
  }, [open]);

  useEffect(() => {
    if (commentsEndRef.current)
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  useEffect(() => {
    if (open) {
      refetch();
    }
    if (commentData) {
      setComments(commentData.comments);
    }
  }, [commentData]);

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment({ userId, postId, comment: newComment });
    refetch();
    setNewComment("");
    return;
  };
  if (isLoading) return <Box>...Loading</Box>;

  return (
    <Modal open={open} onClose={() => handleClose(!open)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            width: "60%",
          }}
        >
          <IconButton
            onClick={() => handleClose(!open)}
            sx={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={`http://localhost:5000/posts/${imageUrl}`}
            alt="Main Content"
            sx={{
              maxWidth: "100%",
              height: "100%",
              borderRadius: 2,
              objectFit: "fill",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            overflowY: "auto",
            borderLeft: "1px solid #ddd",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Avatar
              src={`http://localhost:5000/avatar/${user?.profileImage}`}
              alt={user?._id}
            />
            <Typography sx={{ textAlign: "center" }}>
              {user?.username}
            </Typography>
            <Link
              to={
                user?._id === userId
                  ? `/profile/${user?._id}`
                  : `/user/${user?._id}`
              }
            >
              {" "}
              View Profile
            </Link>
          </Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Comments
          </Typography>
          <Divider />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mt: 2,
              width: "100%",
              scrollBarWidth: "3px",
              height: "400px",
            }}
          >
            {comments &&
              comments.map((comment: any) => {
                return (
                  <Box key={comment._id}>
                    <Box sx={{ display: "flex", mb: 2, gap: "5px" }}>
                      <Avatar
                        src={`http://localhost:5000/avatar/${comment.user.profileImage}`}
                        alt={comment._id}
                      />
                      <Box sx={{ display: "flex", gap: "20px" }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {comment.user.username}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {comment.comment}
                        </Typography>
                      </Box>
                    </Box>
                    <Box ref={commentsEndRef}></Box>
                  </Box>
                );
              })}
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box sx={{ display: "flex", gap: "10px" }}>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FavoriteBorderIcon />
              <Typography variant="body2">{`${likes}`}</Typography>
            </Box> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {" "}
              <ChatBubbleOutlineIcon />
              <Typography>{comments?.length}</Typography>
            </Box>
          </Box>

          {/* Add Comment Input */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItems: "center",
              width: "20vw",
              mt: 2,
            }}
          >
            <form
              style={{ display: "flex", gap: "20px", width: "100%" }}
              onSubmit={handleCommentSubmit}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button
                disabled={!newComment ? true : false}
                variant="contained"
                size="small"
                type="submit"
              >
                Post
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default PostModal;
