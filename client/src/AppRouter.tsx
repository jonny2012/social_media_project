import { Navigate, redirect, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import Register from "./pages/Register";
import { HomePage } from "./pages/HomePage";
import { ExplorePosts } from "./modules/ExplorePosts/ExplorePosts";
import Profile from "./pages/Profile";
import PrivateRoute from "./privateRoute";
import ProfileTemplate from "./pages/ProfileTemplate";
import NotificationsBar from "./modules/notifications/NotificationsBar";
import Chat from "./modules/chatModule/Chat";
import ChatSideBar from "./modules/chatModule/chatSideBar";
import { useSelector } from "react-redux";
import PostModal from "./modules/Post/PostModal";
import Footer from "./modules/footer/Footer";

export const AppRouter = () => {
  const token = useSelector((state: any) => state.auth?.token);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"*"} element={<Navigate to={"/login"} replace />} />
          {token ? (
            <Route element={<PrivateRoute />}>
              <Route path={"/"} element={<HomePage />} />
              <Route path={`/profile/:id`} element={<Profile />} />
              <Route path={"/explore"} element={<ExplorePosts />} />
              <Route path={`/user/:id`} element={<ProfileTemplate />} />
              <Route path={"/create-post"} element={<div />} />
              <Route path={"/chat"} element={<ChatSideBar />} />
              <Route path={"/chat-room/:id"} element={<Chat />} />
              <Route path={"/notifications"} element={<NotificationsBar />} />
              <Route path={"/comments"} element={<PostModal />} />
              <Route path={"*"} element={<Navigate to={"/login"} replace />} />
            </Route>
          ) : (
            <Route element={<Navigate to={"/login"} />}></Route>
          )}
        </Routes>
      </Box>
    </Box>
  );
};
