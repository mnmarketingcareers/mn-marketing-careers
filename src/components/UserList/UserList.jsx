import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Card,
} from '@mui/material';

import UserListItem from "./UserListItem";

import './UserList.css';

function UserList () {
    const userList = useSelector(store => store.userList);
    const dispatch = useDispatch();

    // get users on page load
    useEffect( () => {
        dispatch({ type: 'FETCH_USER_LIST' });
    }, []);

    // Boolean variable for conditional render, checks for message 
    // message will only be sent from server if user access is too low
    const showUserList = (userList.message) ? false : true;

    return(
        <>
            {!showUserList ? (<Card>{userList.message}</Card>) : (<div>
                <h3>Users</h3>

                <TableContainer elevation={4} component={Paper} sx={{ display: 'flex', padding: 1 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center">Access Level</TableCell>
                                <TableCell>Change Access</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList?.map((user) => {
                                return (
                                    <UserListItem key={user.id} user={user} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>)}
        </>
    )
}   


export default UserList;