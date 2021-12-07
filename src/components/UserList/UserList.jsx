import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
                        
                        <li key={user.id}>
                            Username: {user.email} &nbsp;|&nbsp; 
                            Full Name: {user.first_name} {user.last_name} &nbsp;|&nbsp;
                            Access Level: {user.access_level} &nbsp;&nbsp;
                            {(user.access_level < 1) ? (
                                    <button onClick={} >Grant Admin Access</button>
                                ) : (
                                    <button onClick={} >Remove Admin Access</button>
                                )}

                        </li>
                        
                    )}
                )}
            </ul>
        </div>
    )
}   


export default UserList;