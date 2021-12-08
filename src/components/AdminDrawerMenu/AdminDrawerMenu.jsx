import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SwipeableDrawer,
  IconButton,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "@mui/material/ListItem";

import "./AdminDrawerMenu.css";

const AdminDrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogoutClick = () => {
    dispatch({ type: "LOGOUT" });
    setOpen(false);
  };

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
        <h3
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "gray",
            marginBottom: "10px",
          }}
        >
          {user.first_name}
        </h3>
        <Divider />

        <div
          className="closeDrawerButton"
          style={{ textAlign: "center", margin: "8px 0" }}
        >
          <IconButton
            style={{ transform: "scale(2)", margin: "8cpx 0" }}
            onClick={() => setOpen(false)}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider style={{ marginBottom: "16px" }} />

        <div className="drawerLinkColumn">
          <ListItem className="drawerListItem" onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/home">
              <h3>Home</h3>
            </Link>
          </ListItem>
          <ListItem className="drawerListItem" onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/adminjoblist">
              <h3>Jobs</h3>
            </Link>
          </ListItem>

          <ListItem className="drawerListItem" onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/adminhub">
              <h3>Admin Hub</h3>
            </Link>
          </ListItem>

          <ListItem className="drawerListItem" onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/emailtemplate">
              <h3>Send Email</h3>
            </Link>
          </ListItem>

          <ListItem className="drawerListItem" onClick={() => setOpen(false)}>
            <Link className="drawerLink" to="/reviewsubmissions">
              <h3>Review Posts</h3>
            </Link>
          </ListItem>
          <ListItem
            className="drawerListItem"
            onClick={() => handleLogoutClick()}
          >
            <Link className="drawerLink" to="/main">
              <h3>Logout</h3>
            </Link>
          </ListItem>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default AdminDrawerMenu;
