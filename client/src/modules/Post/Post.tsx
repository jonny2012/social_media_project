import {
  Card,
  CardHeader,
  Button,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  useCreatePostCommentsMutation,
  useUpdatePostLikesMutation,
  useUpdatePostUnlikeMutation,
} from "../../redux/RTKqueries/postQueries";
import {
  useCheckFollowQuery,
  useUpdateUserFollowersMutation,
} from "../../redux/RTKqueries/userQueries";
import { Link } from "react-router-dom";
import PostModal from "./PostModal";

const Post = ({
  postId,
  user,
  imageUrl,
  likes,
  comments,
  isFollow,
  postRefetch,
}: any) => {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const sendData = { userId, comment };

  const [
    createComment,
    { data: commentData, error: commentError, isLoading: commentIsLoading },
  ] = useCreatePostCommentsMutation();
  const [follow, { data, error, isLoading }] = useUpdateUserFollowersMutation();
  const [
    addLike,
    { data: likeData, error: likeError, isLoading: LikeIsLoading },
  ] = useUpdatePostLikesMutation();
  const [
    removeLike,
    { data: unlikeData, error: unlikeError, isLoading: unLikeIsLoading },
  ] = useUpdatePostUnlikeMutation();

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);
  const {
    data: followData,
    error: folowError,
    isLoading: followIsLoading,
  } = useCheckFollowQuery(user._id);

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment({ userId, postId, comment });
    postRefetch();
    setComment("");
  };

  const handleLikeRefresh = () => {
    if (likes.includes(userId)) {
      removeLike(postId);
      postRefetch();
    } else {
      addLike({ postId: postId, userId: user._id });
      postRefetch();
    }
    return;
  };

  const variant = followData
    ? followData?.message === "Unfollow"
      ? "outlined"
      : "contained"
    : isFollow
    ? "outlined"
    : "contained";
  const buttonText = followData
    ? followData?.message === "Unfollow"
      ? "Unfollow"
      : "Follow"
    : isFollow
    ? "Unfollow"
    : "Follow";
  return (
    <>
      <Card sx={{ width: "90%", mx: "auto", my: 2 }}>
        <Box>
          <CardHeader
            avatar={
              <Link
                to={
                  user._id === userId
                    ? `/profile/${user._id}`
                    : `/user/${user._id}`
                }
              >
                <Avatar
                  src={`http://localhost:5000/avatar/${user.profileImage}`}
                  alt={user.fullName}
                />
              </Link>
            }
            title={user.fullName}
            action={
              <Button
                onClick={() => {
                  return follow({ folowerId: user?._id });
                }}
                variant={variant}
              >
                {buttonText}
              </Button>
            }
          ></CardHeader>
          <Box sx={{ width: "100%", height: "60vh" }}>
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              sx={{ objectFit: "fill" }}
              image={`http://localhost:5000/posts/${imageUrl}`}
              alt="Post image"
            />
          </Box>
        </Box>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleLikeRefresh}>
              {likes.includes(userId) ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <IconButton onClick={() => setOpen(!open)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <strong>{likes.length}</strong> likes
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <strong>{user.fullName}</strong>
          </Typography>
          <Button onClick={() => setOpen(!open)}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: "block", mt: 1 }}
            >
              View all {comments.length} comments
            </Typography>
          </Button>
          <CardContent sx={{ borderTop: "1px solid #eee", pt: 1 }}>
            <form onSubmit={handleCommentSubmit}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                  sx={{ mr: 1 }}
                />
                <Button type="submit" color="primary" disabled={!comment}>
                  Post
                </Button>
              </Box>
            </form>
          </CardContent>
        </CardContent>
      </Card>
      <PostModal
        open={open}
        handleClose={setOpen}
        user={user}
        postId={postId}
        imageUrl={imageUrl}
        likes={likes.length}
      />
    </>
  );
};
export default Post;
