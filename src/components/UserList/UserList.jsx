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
    Button,
    Card,
    CardContent,
    Typography,
    Grid
} from '@mui/material';

import UserListItem from "./UserListItem";

import './UserList.css';
import { flexbox } from "@mui/system";

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
            {!showUserList ? (<p>{userList.message}</p>) : (<div>
                <h4>Users</h4>
                
                {/* <ul>
                    {userList.map((user) => {return(
                            
                            <UserListItem key={user.id} user={user}/>
                            
                        )}
                    )}
                </ul> */}
                <TableContainer component={Paper} sx={{ display: 'flex', padding: 1}}>
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
                                                <UserListItem key={user.id} user={user}/>
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