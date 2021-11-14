import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <img
          className="nav-title"
          width="500px"
          style={{ margin: "20px" }}
          src="./images/nav-horizontal-logo.png"
        />
      </Link>
      <div className="nav-words">
        {/* If no user is logged in, show these links */}
        {user.id === null && (
          // If there's no user, show login/registration links
          <>
            <Link className="navLink" to="/login">
              Login / Register
            </Link>

            {/*<Link className="navLink" to="/info">
              Info Page
            </Link> */}
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <LogOutButton className="navLink" />

            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/adminhub">
              Admin Hub
            </Link>

            <Link className="navLink" to="/reviewsubmissions">
              Review New Posts
            </Link>
          </>
        )}

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

        {/* <Link className="navLink" to="/info">
          Info Page
        </Link> */}

        {/* <Link className="navLink" to="/login">
          Login / Register
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
