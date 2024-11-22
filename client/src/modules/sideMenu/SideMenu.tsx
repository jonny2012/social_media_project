import { useState } from "react";
import { DrawerList } from "./DrawerList";
import { Box } from "@mui/material";
import TemporaryDrawer from "../SearchBar/searchDrawer";
import { Button } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/slices/authSlice";
import NotificationsBar from "../notifications/NotificationsBar";
import CreatePost from "../../pages/CreatePost";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const toggleDrawer = (newtoggle: boolean) => {
    setOpen(newtoggle);
  };

  return (
    <Box sx={token ? { display: "block" } : { display: "none" }}>
      <DrawerList
        open={open}
        toggleDrawer={toggleDrawer}
        openNotifications={openNotifications}
        setOpenNotifications={setOpenNotifications}
        openCreatePost={openCreatePost}
        setOpenCreatePost={setOpenCreatePost}
      />

      <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
      <NotificationsBar
        openNotifications={openNotifications}
        setOpenNotifications={setOpenNotifications}
      />
      <CreatePost open={openCreatePost} setOpen={setOpenCreatePost} />

      <Button
        onClick={() => {
          sessionStorage.removeItem("token");

          dispatch(clearToken());
          navigate("/login", { replace: true });
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
