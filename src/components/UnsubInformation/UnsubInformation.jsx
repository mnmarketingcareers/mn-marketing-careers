import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { 
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';

import './UnsubInformation.css'


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
            <div className="table-margin-container">
            <TableContainer component={Paper} sx={{ margin: 8, width: 2000}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Reason</TableCell>
                            <TableCell align="center">Message</TableCell>
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
            </div>
        </>
    )
}

export default UnsubInformation;