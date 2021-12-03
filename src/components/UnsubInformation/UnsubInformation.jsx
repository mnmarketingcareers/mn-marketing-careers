import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { 
    Button, 
    CircularProgress,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';


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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Reason</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {unsubscriberList.map((unsubscriber) => {                           
                                return (
                                    <TableRow key={unsubscriber.id}>
                                        <TableCell>{unsubscriber.date_received}</TableCell>
                                        <TableCell>{unsubscriber.reason}</TableCell>
                                        <TableCell>{unsubscriber.message}</TableCell>
                                    </TableRow>)
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default UnsubInformation;