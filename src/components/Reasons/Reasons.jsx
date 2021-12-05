import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from 'moment';
import {
    Card,
    CardContent,
    Typography
} from '@mui/material';

function Reasons({firstReason}){

    return(
        <>
        <h1>hi there</h1>
        <div className="card-container">
            {/* {JSON.stringify(unsubscriberList)} */}
            {/* <button onClick={testButton}>Test..</button> */}
                    <Card style={{width: 250}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                A total of 
                                <Typography variant="h5" color="primary" component="div">
                                    {firstReason.length}
                                </Typography>
                                people who have found jobs through MNMC.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
        </>
    )
}

export default Reasons;