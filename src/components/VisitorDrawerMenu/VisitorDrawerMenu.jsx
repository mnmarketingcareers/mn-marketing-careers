import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

import { SwipeableDrawer, IconButton, Container, Divider, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import MenuIcon from "@mui/icons-material/Menu";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "@mui/material/ListItem";

import './VisitorDrawerMenu.css'


const DrawerMenu = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch({ type: "LOGOUT" });
        setOpen(false);
      };

    return (
        <div className="drawerContainer">
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon style={{transform: 'scale(2)'}}  />
        
      </IconButton>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div className="closeDrawerButton" style={{ textAlign: "center" }}>
          <IconButton style={{transform: 'scale(2)'}}
           
            onClick={() => setOpen(false)}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
       

        <div>
          <ListItem onClick={() => setOpen(false)}>
            <Link to="/user">
              <HomeIcon className="drawerIcons" />
            </Link>
          </ListItem>
          <ListItem onClick={() => setOpen(false)}>
            <Link to="/about">
              <InfoIcon className="drawerIcons" />
            </Link>
          </ListItem>
          <ListItem onClick={() => setOpen(false)}>
            <Link to="/search">
              <SearchIcon className="drawerIcons" />
            </Link>
          </ListItem>
         
        </div>
      </SwipeableDrawer>
    </div>
    )
}

export default DrawerMenu
