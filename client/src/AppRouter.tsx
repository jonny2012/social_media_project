import { Route, Routes } from "react-router-dom";
import SideMenu from "./modules/sideMenu/SideMenu";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import Register from "./pages/Register";
import { HomePage } from "./pages/HomePage";
import { ExplorePosts } from "./modules/ExplorePosts/ExplorePosts";
import Profile from "./pages/Profile";

export const AppRouter = ()=>{
    const userId = localStorage.getItem("userId")
    console.log(userId)

    return (
        <Box sx={{display:"flex", flexDirection:"row"}}>
        <SideMenu/>
        <Routes>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        <Route  path={"/home"} element={<HomePage/>}/>
        <Route path={`/profile/${userId}`} element={<Profile/>}/>
        <Route path={"/explore"} element={<ExplorePosts/>}/>
        <Route  path={"/messages"} element={<div/>}/>
        <Route  path={"/create"} element={<div/>}/>
        <Route  path={"*"} element={<div/>}/>
        </Routes>
        </Box>

    )
}