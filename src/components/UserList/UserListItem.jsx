import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import "./UserList.css";

function UserListItem({user}) {
    // set useDispatch for click event functions
    const dispatch = useDispatch();

    const handleGrantAccess = () => {
        // dispatch to saga with id to add access
        console.log('Clicked grant access, user id:', user.id);
        dispatch({ type: 'GRANT_ADMIN_ACCESS', payload: user.id });
    }

    const handleRemoveAccess = () => {
        // dispatch to saga with id to remove access
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
                                    <Button variant='contained' id="grant-access-btn" size="small"
                                        onClick={() => {if(window.confirm('Confirm you want to grant this User Adim access')) handleGrantAccess()} }>Grant Admin Access</Button>
                                ) : (
                                    <Button variant='contained' id="rmv-access-btn" size="small"
                                        onClick={() => {if (window.confirm("Confirm you want to remove this User's Admin access")) handleRemoveAccess()}} >Remove Admin Access</Button>
                                )}

                        </li>
        </>
    )
}

export default UserListItem;