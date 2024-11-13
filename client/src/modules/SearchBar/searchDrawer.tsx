import { useState } from "react";
import {Typography,ListItemAvatar,ListItemButton,ListItemIcon,ListItemText,TextField,Avatar} from "@mui/material"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useSearchUsersByNameQuery } from '../../redux/RTKqueries/userQueries';

export default function TemporaryDrawer({toggleDrawer,open}:any) {

    const [inputData, setInputData]= useState("")
    

    const {data:userData, error, isLoading}= useSearchUsersByNameQuery(inputData)
 
 
  
    const handleChange = (e:any)=>{
      if(e.target.value !== null  ){
      setInputData(e.target.value)
 
      }
    }
  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" >
  <Box sx={{ padding: 2, width: 300, margin: '0 auto' }}>

      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Search
      </Typography>

      <TextField
        placeholder="Search"
        variant="outlined"
        value={inputData}
        onChange={handleChange}
        fullWidth

          sx= {{ borderRadius: '5px',  backgroundColor: '#f0f0f0' }}
      />
      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 1 }}>
        Users
      </Typography>

      {inputData && userData && userData.map((user: any, i: number) => (
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={user.fullName} src={`http://localhost:5000/avatar/${user.profileImage}`} />
          </ListItemAvatar>
          <ListItemText primary={user.fullName} />
        </ListItem>
      </List>
))}
    </Box>
    </Box>
  );

  return (
    <div>
              {open && (
        <Box
          onClick={()=>toggleDrawer(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 250, 
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: (theme) => theme.zIndex.drawer - 1,
          }}
        />
      )}

  
      <Drawer
        anchor="left"
        open={open}
        onClose={()=>toggleDrawer(false)}
        ModalProps={{
            BackdropProps: {
              invisible: true, 
            },
          }}
  
        sx={{
          '& .MuiDrawer-paper': {
            transform: open ? 'translateX(0)' : 'translateX(250px)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow:"none",
            left:"250px"
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
