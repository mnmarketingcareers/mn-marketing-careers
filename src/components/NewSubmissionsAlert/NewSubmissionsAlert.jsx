import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material';

function NewSubmissions() {
    // setup react hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const { pendingPostings } = useSelector(store => store);

    // Populate the pendingPostings reducer
    useEffect( () => {
        dispatch({ type: 'FETCH_PENDING_POSTINGS' });
    }, []);

    return(
        <Card sx={{ }}>
            <CardActionArea onClick={() => history.push('/reviewsubmissions') }>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        You have
                        <Typography variant="h5" color="primary" component="div">
                        {pendingPostings.length}
                        </Typography>
                        New job opening submissions awaiting approval
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <i>click to view</i>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default NewSubmissions