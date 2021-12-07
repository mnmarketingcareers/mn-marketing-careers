import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // clear reducers with admin only content
    // dispatch({ type: 'UNSET_JOB_ISSUE_LIST' });
    // dispatch({ type: 'UNSET_USER_LIST' });
    // dispatch({ type: 'RESET_APPROVED_POSTINGS' });
    // dispatch({ type: 'RESET_PENDING_POSTINGS' });
    // dispatch({ type: 'UNSET_UNSUB_FEEDBACK' });
    // dispatch({ type: 'UNSET_SUBS_LIST' });
  }

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
