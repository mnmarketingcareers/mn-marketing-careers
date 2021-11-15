import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.email}!</h2>
      <p>Your ID is: {user.id}</p>
      <iframe src="https://us5.admin.mailchimp.com/campaigns/edit?id=5165845#0" frameBorder="1" height="500" width="500"></iframe>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
