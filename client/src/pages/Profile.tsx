import React, { useState } from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useGetUserProfileQuery } from '../redux/RTKqueries/userQueries';
import { useParams } from 'react-router-dom';

function ProfileHeader() {
  
    const userId = localStorage.getItem("userId")
    const {data:profile, error, isLoading}= useGetUserProfileQuery(userId)
    console.log(userId)

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', display:"flex", gap:"40px",  padding: 3 }}>
      <Avatar
        alt="itcareerhub"
        src={`http://localhost:5000/avatar/${profile?.profileImage}`} 
        sx={{
          width: 150,
          height: 150,
          border: '2px solid transparent',
          borderRadius: '50%',
          marginBottom: 1,
          backgroundImage: 'linear-gradient(45deg, #FFDD55, #FF543E, #FF33A1, #C13584, #833AB4)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
        }}
      />


      <Box>
      <Box sx={{display:"flex", gap:"40px",}}>
      <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: 1,textAlign:"center" }}>
        {profile?.fullName}
      </Typography>


      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginBottom: 2 }}>
        <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
          Follow
        </Button>
        <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
          Message
        </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth:"300px", marginBottom: 2 }}>
        <Box sx={{ textAlign: 'center',display:"flex",gap:"5px" }}>
          <Typography variant="body2" fontWeight="bold">{profile?.posts.length}</Typography>
          <Typography textAlign={"center"} variant="caption" color="textSecondary">posts</Typography>
        </Box>
        <Box sx={{ textAlign: 'center',display:"flex", gap:"5px"}}>
          <Typography variant="body2" fontWeight="bold">{profile?.followers?.length || 0}</Typography>
          <Typography textAlign={"center"} variant="caption" color="textSecondary">followers</Typography>
        </Box>
        <Box sx={{ textAlign: 'center',display:"flex",gap:"5px" }}>
          <Typography variant="body2" fontWeight="bold">{profile?.following?.length}</Typography>
          <Typography sx={{textAlign:"center"}} variant="caption" color="textSecondary">following</Typography>
        </Box>
      </Box>

      {/* Bio */}
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1, textAlign:"start" }}>
        • Гарантия помощи с трудоустройством в ведущие IT-компании<br />
        • Выпускники зарабатывают от 4k евро<br />
        БЕСПЛАТНАЯ ...
      </Typography>

      {/* Link */}
      <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', textDecoration: 'none' }}>
      </Typography>
    </Box>
    </Box>
  );
}

export default ProfileHeader;
