import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link, useParams } from "react-router-dom";
 export const DrawerList = ({ toggleDrawer,open}:any)=>{
  const userId = localStorage.getItem("userId")
    const pages = [
        {   link:"/home",
            image:<HomeOutlinedIcon  />,
            text:"Home"
        },
        {   link:"/home",
            image:<SearchOutlinedIcon />,
            text:"Search"

        },
        {   link:"/explore",
            image:<ExploreOutlinedIcon />,
            text:"Explore"
        },
        {   link:"/messages",
            image:<EmailOutlinedIcon />,
            text:"Messages"
        },
        {link:"/notification",
            image:<FavoriteBorderOutlinedIcon />,
            text:"Notification"
        },
        {link:`/profile/${userId}`,
            image:<AddCircleOutlineOutlinedIcon />,
            text:"Profile"
        }
      ];
      const params = useParams()
      console.log(params)

    return (
        <Box sx={{ width: 250, borderRight:"1px solid #DBDBDB" }} role="presentation" >
            <Box sx={{display:"flex",
                justifyContent:"center",
                alignItems:"center",
                padding:"20px 20px"
            }}>
                <Typography>Instagram</Typography>
            </Box>
      <List>
        {pages.map((page, index) => (
          <ListItem key={page.text}  >
            <Link to={`${page.link}`}>
            <ListItemButton>
              <ListItemIcon>{page.image}</ListItemIcon>
              <ListItemText primary={page.text}   onClick={()=>{
            if(page.text === "Search"){
       toggleDrawer(!open)
       
            }}}/>
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
    )
}