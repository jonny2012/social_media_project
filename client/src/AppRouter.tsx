import { Navigate, redirect, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import Register from "./pages/Register";
import { HomePage } from "./pages/HomePage";
import { ExplorePosts } from "./pages/ExplorePosts";
import Profile from "./pages/Profile";
import PrivateRoute from "./privateRoute";
import ProfileTemplate from "./pages/ProfileTemplate";
import NotificationsBar from "./modules/notifications/NotificationsBar";
import Chat from "./modules/chatModule/Chat";
import ChatSideBar from "./modules/chatModule/chatSideBar";
import PostModal from "./modules/Post/PostModal";
import ErrorPage from "./pages/ErrorPage";

export const AppRouter = () => {
  const token = sessionStorage.getItem("token");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <Routes>
          <Route>
            <Route element={<PrivateRoute />}>
              <Route path={"/"} element={<HomePage />} />
              <Route path={`/profile/:id`} element={<Profile />} />
              <Route path={"/explore"} element={<ExplorePosts />} />
              <Route path={`/user/:id`} element={<ProfileTemplate />} />
              <Route path={"/chat"} element={<ChatSideBar />} />
              <Route path={"/chat-room/:id"} element={<Chat />} />
              <Route path={"/notifications"} element={<NotificationsBar />} />
              <Route path={"/comments"} element={<PostModal />} />

              <Route path={"*"} element={<ErrorPage />} />
            </Route>
          </Route>
          <Route>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};
