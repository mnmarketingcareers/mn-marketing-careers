import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserListItem from "./UserListItem";

function UserList () {
    const userList = useSelector(store => store.userList);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch({ type: 'FETCH_USER_LIST' });
    }, []);

    return(
        <div>
            <h4>Users</h4>
            <p>{JSON.stringify(userList)}</p>
            <ul>
                {userList.map((user) => {return(
                        
                        <UserListItem user={user}/>
                        
                    )}
                )}
            </ul>
        </div>
    )
}   


export default UserList;