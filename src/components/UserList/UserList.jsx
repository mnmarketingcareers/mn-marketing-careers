import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
            {!showUserList ? (<p>{userList.message}</p>) : (<div>
                <h4>Users</h4>
                
                <ul>
                    {userList.map((user) => {return(
                            
                            <UserListItem key={user.id} user={user}/>
                            
                        )}
                    )}
                </ul>
            </div>)}
        </>
    )
}   


export default UserList;