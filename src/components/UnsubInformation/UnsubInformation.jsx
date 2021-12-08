import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
    Typography,
    Grid
} from '@mui/material';

import './UnsubInformation.css';


function UnsubInformation() {

    const history = useHistory()

    const dispatch = useDispatch();

    const unsubscriberList = useSelector(store => store.unsubscriberReducer);

    const backToAdminHub = () => {
        history.push('/adminhub')
    }

    const showCounts = unsubscriberList ? true : false;
 
    useEffect(() => {
        dispatch({ type: 'GET_UNSUBSCRIBER_FEEDBACK' });
    }, []);

    return (
        <>
            <div className="page-container-actual">
                {!showCounts && <p>Loading...</p>}
                {showCounts && <>
                    <h2>Unsubscriber Feedback:</h2>
                    <Grid container className="card-container">
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <Card style={{minWidth: 200}}>
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <Card style={{minWidth: 200}}>
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <Card style={{minWidth: 200}}>
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <Card style={{minWidth: 200}}>
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <Card style={{minWidth: 200}}>
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
                        </Grid>
                    </Grid>
                    <div className="table-margin-container">
                            <TableContainer component={Paper} sx={{ padding: 3, width: 2000 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" sx={{ fontSize: 23}} colSpan={2}>Other Reasons given for unsubscribing</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {unsubscriberList.messages?.map((message) => {
                                            return (
                                                <TableRow key={message.id}>
                                                    <TableCell align="center" sx={{width: 80}}>{moment(message.date_received).format('MMM Do YY')}</TableCell>
                                                    <TableCell align="center">{message.message}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    <div className="back-button">
                        <Button variant="contained" onClick={backToAdminHub}>Back</Button>
                    </div>
                </>}
            </div> 
        </>
    )
}

export default UnsubInformation;
