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

import './UnsubInformation.css';
import Reasons from '../Reasons/Reasons.jsx'
import { OtherHousesTwoTone } from "@mui/icons-material";


function UnsubInformation() {

    const history = useHistory()

    const dispatch = useDispatch();

    const unsubscriberList = useSelector(store => store.unsubscriberReducer);

    const backToAdminHub = () => {
        history.push('/adminhub')
    }

    const showCounts = unsubscriberList ? true : false;

    const firstReason = [];

    const secondReason = [];
 
     const testButton = () => {
         console.log('in button ');
         for(let i in unsubscriberList){
             if(unsubscriberList[i].reason === "Found a Job Through MNMC!"){
                 console.log('in loop', unsubscriberList[i])
                 firstReason.push(unsubscriberList[i]);               
             } else if (unsubscriberList[i].reason === "Found a Job Through Other Mediums"){
                 console.log('IN LOOP', unsubscriberList[i]);
                 secondReason.push(unsubscriberList[i]);
             }
         } 
     }
 
     console.log('what is first reason', firstReason)
 
     console.log('what is second reason', secondReason)
 
    useEffect(() => {
        dispatch({ type: 'GET_UNSUBSCRIBER_FEEDBACK' });
        testButton();
    }, []);

    return (
        <>
            <div className="page-container-actual">
                {!showCounts && <p>Loading...</p>}
                {showCounts && <>
                <h2>People unsubscribing gave the following reasons:</h2>
                {/* <ul>
                    <li>Content Not Relevant To My Search: &nbsp; <b>{unsubscriberList.notRelevantCount?.count}</b></li>
                    <li>Found a Job Through MNMC!: &nbsp; <b>{unsubscriberList.foundThruMnmcCount?.count}</b></li>
                    <li>Found a Job Through Other Mediums: &nbsp; <b>{unsubscriberList.foundElseCount?.count}</b></li>
                    <li>I Did Not Sign Up to Receive These Emails:&nbsp;<b>{unsubscriberList.noSignUpCount?.count}</b></li>
                    <li>Other: &nbsp;<b>{unsubscriberList.otherCount?.count}</b></li>
                </ul> */}
                </>}
            </div>    

            <div className="card-container">
                <Card style={{width: 250}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            A total of 
                            <Typography variant="h5" color="primary" component="div">
                                {unsubscriberList.notRelevantCount?.count}
                            </Typography>
                            people say content is not relevant to search.
                        </Typography>
                    </CardContent>
                </Card>
            
                <Card style={{width: 250}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            A total of 
                            <Typography variant="h5" color="primary" component="div">
                                {unsubscriberList.foundThruMnmcCount?.count}
                            </Typography>
                            people found jobs through MNMC.
                        </Typography>
                    </CardContent>
                </Card>

                <Card style={{width: 250}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            A total of 
                            <Typography variant="h5" color="primary" component="div">
                                {unsubscriberList.foundElseCount?.count}
                            </Typography>
                            people found jobs through other mediums.
                        </Typography>
                    </CardContent>
                </Card>

                <Card style={{width: 250}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            A total of 
                            <Typography variant="h5" color="primary" component="div">
                                {unsubscriberList.noSignUpCount?.count}
                            </Typography>
                            people did not sign up for these emails.
                        </Typography>
                    </CardContent>
                </Card>

                <Card style={{width: 250}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            A total of 
                            <Typography variant="h5" color="primary" component="div">
                                {unsubscriberList.otherCount?.count}
                            </Typography>
                            people unsubscribed for other reasons.
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            {/* <Reasons firstReason={firstReason}/>
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
            </div> */}
        </>
    )
}

export default UnsubInformation;