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
        <h2 className="nav-title">MN Marketing Title</h2>
      </Link>
      <div>



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
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/adminhub">
              <i>Admin Hub</i>
            </Link>

            <Link className="navLink" to="/adminjoblist">
              <i>Admin Jobs List</i>
            </Link>

            <Link className="navLink" to="/reviewsubmissions">
              <i>Review New Posts</i>
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}



        <Link className="navLink" to="/main">
          <i>Main</i>
        </Link>

        <Link className="navLink" to="/employerpage">
          <i>Submit Job</i>
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
