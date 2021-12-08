import { useDispatch } from "react-redux";
import { 
    Button,
    TableRow,
    TableCell, 
} from "@mui/material";
import "./UserList.css";

function UserListItem({user}) {
    // set useDispatch for click event functions
    const dispatch = useDispatch();

    const handleGrantAccess = () => {
        // dispatch to saga with id to add access
        dispatch({ type: 'GRANT_ADMIN_ACCESS', payload: user.id });
    }

    const handleRemoveAccess = () => {
        // dispatch to saga with id to remove access
        dispatch({ type: 'REMOVE_ADMIN_ACCESS', payload: user.id });
    }

    return(
        <>
            
            <TableRow key={user.id}>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.first_name} {user.last_name}</TableCell>
                <TableCell align="center">{user.access_level}</TableCell>
                <TableCell>
                    {(user.access_level < 1) ? (
                        <Button variant='contained' id="grant-access-btn" size="small"
                            onClick={() => {if(window.confirm('Confirm you want to grant this User Adim access')) handleGrantAccess()} }>Grant Admin Access</Button>
                        ) : (
                        <Button variant='contained' id="rmv-access-btn" size="small"
                            onClick={() => {if (window.confirm("Confirm you want to remove this User's Admin access")) handleRemoveAccess()}} >Remove Admin Access</Button>
                        )
                    }
                </TableCell>
            </TableRow>
        </>
    )
}

export default UserListItem;