import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button 
    style={{backgroundColor: 'transparent'}}
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className="navLink"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
