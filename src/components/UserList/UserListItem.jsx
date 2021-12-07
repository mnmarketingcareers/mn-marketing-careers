import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function UserListItem({user}) {
    // set useDispatch for click event functions
    const dispatch = useDispatch();
    // set 

    const handleGrantAccess = () => {
        // dispatch something
        console.log('Clicked grant access, user id:', user.id);
        dispatch({ type: 'GRANT_ADMIN_ACCESS', payload: user.id });
    }

    const handleRemoveAccess = () => {
        // dispatch something
        console.log('Clicked Remove Access, user id:', user.id);
        dispatch({ type: 'REMOVE_ADMIN_ACCESS', payload: user.id });
    }

    return(
        <>
            <li>
                            Username: {user.email} &nbsp;|&nbsp; 
                            Full Name: {user.first_name} {user.last_name} &nbsp;|&nbsp;
                            Access Level: {user.access_level} &nbsp;&nbsp;
                            {(user.access_level < 1) ? (
                                    <button onClick={() => {if(window.confirm('Confirm you want to grant this User Adim access')) handleGrantAccess()} }>Grant Admin Access</button>
                                ) : (
                                    <button onClick={() => {if (window.confirm("Confirm you want to remove this User's Admin access")) handleRemoveAccess()}} >Remove Admin Access</button>
                                )}

                        </li>
        </>
    )
}

export default UserListItem;