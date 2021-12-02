import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";


function UnsubInformation(){

    const history = useHistory()

    const dispatch = useDispatch();

    const unsubscriberList = useSelector(store => store.unsubscriberReducer);

    useEffect(() => {
       dispatch({type: 'GET_UNSUBSCRIBER_FEEDBACK'})
    }, []);

    return(
        <>
        <p>{JSON.stringify(unsubscriberList)}</p>
            We're in
        </>
    )
}

export default UnsubInformation;