import { useState } from "react";
import { DrawerList } from "./DrawerList";
import {Box} from "@mui/material"
import TemporaryDrawer from "../SearchBar/searchDrawer";

export default function SideMenu() {
  const [open, setOpen] =useState(false);

  const toggleDrawer = (newtoggle:boolean) => {
    console.log(newtoggle)
    setOpen(newtoggle);

  };
  return (
 
      <Box>
       <DrawerList open={open} toggleDrawer={toggleDrawer}/>
      
       <TemporaryDrawer open={open} toggleDrawer={toggleDrawer}/>
      </Box>
 
  );
}
