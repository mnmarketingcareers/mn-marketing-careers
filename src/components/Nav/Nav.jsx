import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import VisitorDrawerMenu from "../VisitorDrawerMenu/VisitorDrawerMenu";
import AdminDrawerMenu from "../AdminDrawerMenu/AdminDrawerMenu";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/main">
          <img
            style={{ margin: "20px" }}
            src="./images/nav-horizontal-logo.png"
          />
        </Link>
      </div>

      <Link to="/main">
        <img
          className="nav-title-circle-only"
          src="./images/circle-logo-only-v2.png"
        />
      </Link>
      <div>
        {/* ---------------------------------------------- */}
        {/* WHAT WILL APPEAR FOR VISITOR - NO ADMIN LOGIN: */}
        {/* ---------------------------------------------- */}

        {user.id === undefined && (
          <>
            <div className="nav-words-visitor">
              <Link className="navLink" to="/main">
                Main
              </Link>

              <Link className="navLink" to="/employerpage">
                Submit Job
              </Link>

              <Link className="navLink" to="/about">
                About
              </Link>

              <Link className="navLink" to="/unsubfeedbackpage">
                Unsubscribe
              </Link>

              {/* <Link style={{fontSize: "10px"}}className="navLink" to="/login">
                Login
              </Link> */}
            </div>

            {/* hamburger menu will only appear on screen size 768 and down */}
            <div className="hamburger">
              <VisitorDrawerMenu />
            </div>
          </>
        )}

        {/* ---------------------------------------------- */}
        {/* ---WHAT WILL APPEAR FOR ADMIN IF LOGGED IN:--- */}
        {/* ---------------------------------------------- */}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <div className="nav-words-admin">
              <LogOutButton />

              <Link className="navLink" to="/emailtemplate">
                Send Email
              </Link>

              <Link className="navLink" to="/adminjoblist">
                Jobs
              </Link>

              <Link className="navLink" to="/adminhub">
                Admin Hub
              </Link>

              <Link className="navLink" to="/reviewsubmissions">
                Review New Posts
              </Link>
              <Link className="navLink" to="/adminjobissuelist">
                Review Job Issues
              </Link>
            </div>

            {/* hamburger menu will only appear on screen size 768 and down */}
            <div className="hamburger">
              <AdminDrawerMenu />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;

//deletelater

//-------------junk drawer------------//

// <Link className="navLink" to="/info">
//           Info Page
//         </Link> */
