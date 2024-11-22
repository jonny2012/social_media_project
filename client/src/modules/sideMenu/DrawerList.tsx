import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export const DrawerList = ({
  toggleDrawer,
  open,
  openNotifications,
  setOpenNotifications,
  openCreatePost,
  setOpenCreatePost,
}: any) => {
  const id = sessionStorage.getItem("userId");

  return (
    <>
      <Box sx={{ width: 250, borderRight: "1px solid #DBDBDB", zIndex: 2501 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 20px",
          }}
        >
          <Typography>ICHGRAM</Typography>
        </Box>
        <List>
          <ListItem>
            <Link to={`/`}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => toggleDrawer(!open)}>
              <ListItemIcon>
                <SearchOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Search"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Link to={`/explore`}>
              <ListItemButton>
                <ListItemIcon>
                  <ExploreOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Explore"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to={`/chat`}>
              <ListItemButton>
                <ListItemIcon>
                  <EmailOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Chat"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => setOpenNotifications(!openNotifications)}
            >
              <ListItemIcon>
                <FavoriteBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Notifications"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setOpenCreatePost(!openCreatePost)}>
              <ListItemIcon>
                <AddCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Create"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Link to={`/profile/${id}`}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={`Profile`} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
  );
};
