import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LogOutButton from "../LogOutButton/LogOutButton";


import {
  SwipeableDrawer,
  IconButton,
  Container,
  Divider,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "@mui/material/ListItem";

import './VisitorDrawerMenu.css'


const VisitorDrawerMenu = () => {

  const [open, setOpen] = useState(false);


  return (
    <div className="drawerContainer">
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon style={{ transform: "scale(2)" }} />
      </IconButton>

      <SwipeableDrawer
      className="drawer"
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >

        <div className="closeDrawerButton" style={{ textAlign: "center", margin: '8px 0'}}>
          <IconButton
            style={{ transform: "scale(2)", margin: '8cpx 0' }}
            onClick={() => setOpen(false)}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider style={{marginBottom: '16px'}} />

        <div className="drawerLinkColumn">
        <ListItem className="drawerListItem" onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/main">
              <h3>Jobs</h3>
            </Link>
          </ListItem>
          <ListItem className="drawerListItem" onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/about">
              <h3>About</h3>
            </Link>
          </ListItem>
          <ListItem onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/employerpage">
              <h3>Submit Job</h3>
            </Link>
          </ListItem>
          <ListItem onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/unsubfeedbackpage">
              <h3>Unsubscribe</h3>
            </Link>
          </ListItem>
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default VisitorDrawerMenu
