import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material';

function NewPostingsReady() {
    // setup react hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const { approvedPostings } = useSelector(store => store);

    // Populate the pendingPostings reducer
    useEffect( () => {
        dispatch({ type: 'FETCH_APPROVED_POSTINGS' });
    }, []);

    return(
        <Card sx={{ minWidth: 275 }}>
            <CardActionArea onClick={() => history.push('/adminjoblist') }>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        You have
                        <Typography variant="h5" color="primary" component="div">
                        {approvedPostings.length}
                        </Typography>
                        Job openings ready to be posted to the live page
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <i>click to view</i>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default NewPostingsReady;