import { Card, CardHeader,Button, CardMedia, CardContent, Typography, Avatar, IconButton, Box, TextField } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useCreatePostCommentsMutation } from './redux/RTKqueries/postQueries';
import { Link } from 'react-router-dom';


const Post = ({postId, user, imageUrl,  likes, comments, }:any) => {

  const [comment, setComment] = useState('');
  const userId = "673242deb8c9ec294c571f64"
  const sendData = {userId, comment}
  const [createComment, {data, error, isLoading}]= useCreatePostCommentsMutation()
  console.log(data)

  const handleCommentChange = (e:ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

  const handleCommentSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 createComment({userId, postId, comment})
    setComment(''); // Clear the comment input after submission
  };

return (
    <Card sx={{ maxWidth: "100%", mx: 'auto', my: 2 }}>
      <Link to={`/profile/${user._id}`}>
      <Box>
    <CardHeader
      avatar={<Avatar src={`http://localhost:5000/avatar/${user.profileImage}`} alt={user.fullName} />}
      title={user.fullName}
      action={<Typography sx={{ color: 'blue', cursor: 'pointer' }}>Follow</Typography>}
    />
    <CardMedia
      component="img"
      height="100%"
      
      image={`http://localhost:5000/posts/${imageUrl}`}
      alt="Post image"
    />
    
    </Box>
    </Link>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton><FavoriteBorderIcon /></IconButton>
        <IconButton><ChatBubbleOutlineIcon /></IconButton>
        <IconButton><ShareIcon /></IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        <strong>{likes.length}</strong> likes
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        <strong>{user.fullName}</strong>
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
        View all {comments.length} comments
      </Typography>
      <CardContent sx={{ borderTop: '1px solid #eee', pt: 1 }}>
        <form onSubmit={handleCommentSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
  
)}
export default Post;