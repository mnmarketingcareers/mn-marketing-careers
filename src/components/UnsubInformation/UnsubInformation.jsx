import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from 'moment';
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
    Typography
} from '@mui/material';

import './UnsubInformation.css'


function UnsubInformation() {

    const history = useHistory()

    const dispatch = useDispatch();

    const unsubscriberList = useSelector(store => store.unsubscriberReducer);

    const backToAdminHub = () => {
        history.push('/adminhub')
    }

    useEffect(() => {
        dispatch({ type: 'GET_UNSUBSCRIBER_FEEDBACK' })
    }, []);

    return (
        <>
            <div className="page-container-actual">
                <div className="card-container">
                    <Card style={{width: 250}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                There are
                                <Typography variant="h5" color="primary" component="div">
                                    {unsubscriberList.length}
                                </Typography>
                                people who have unsubscribed in the past 30 days.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="table-margin-container">
                    <TableContainer component={Paper} sx={{ padding: 3, width: 2000 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontSize: 23 }}>Date</TableCell>
                                    <TableCell align="center" sx={{ fontSize: 23 }}>Reason</TableCell>
                                    <TableCell align="center" sx={{ fontSize: 23 }}>Message</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unsubscriberList.map((unsubscriber) => {
                                    return (
                                        <TableRow key={unsubscriber.id}>
                                            <TableCell align="center">{(moment(unsubscriber.date_received).format('MMM Do YY'))}</TableCell>
                                            <TableCell align="center">{unsubscriber.reason}</TableCell>
                                            <TableCell align="center">{unsubscriber.message}</TableCell>
                                        </TableRow>)
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="back-button">
                    <Button variant="contained" onClick={backToAdminHub}>Back</Button>
                </div>
            </div>
        </>
    )
}

export default UnsubInformation;