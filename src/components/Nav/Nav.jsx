import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="nav-title">
      <Link to="/home">
        <img
          
          style={{ margin: "20px" }}
          src="./images/nav-horizontal-logo.png"
        />
      </Link>
      </div>

      <Link to="/home">
        <img
          className="nav-title-circle-only"
          // style={{ margin: "20px" }}
          src="./images/circle-logo-only-v2.png"
        />
      </Link>
      <div>
        {/* ---------------------------------------------- */}
        {/* WHAT WILL APPEAR FOR VISITOR - NO ADMIN LOGIN: */}
        {/* ---------------------------------------------- */}

        {user.id === undefined && (
          <>
            <div className="nav-words">
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
            </div>

            {/* hamburger menu will only appear on screen size 768 and down */}
            <div className="hamburger">
              <MenuIcon style={{ transform: "scale(2)" }} />
            </div>
          </>
        )}

        {/* ---------------------------------------------- */}
        {/* ---WHAT WILL APPEAR FOR ADMIN IF LOGGED IN:--- */}
        {/* ---------------------------------------------- */}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <div className="nav-words">
              <LogOutButton />

              <Link className="navLink" to="/user">
                Home
              </Link>

              <Link className="navLink" to="/adminhub">
                Admin Hub
              </Link>

              <Link className="navLink" to="/reviewsubmissions">
                Review New Posts
              </Link>
            </div>

            {/* hamburger menu will only appear on screen size 768 and down */}
            <div className="hamburger">
              <MenuIcon style={{ transform: "scale(2)" }} />
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

{
  /* <Link className="navLink" to="/info">
          Info Page
        </Link> */
}

{
  /* <Link className="navLink" to="/login">
          Login / Register
        </Link> */
}
