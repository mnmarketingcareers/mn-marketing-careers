import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material';

function NewIssues() {
    // setup react hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const { setJobIssueListReducer } = useSelector(store => store);

    // Populate the pendingPostings reducer
    useEffect( () => {
        dispatch({ type: 'FETCH_JOB_ISSUES' });
    }, []);

    return(
        <Card sx={{}}>
            <CardActionArea onClick={() => history.push('/adminjobissuelist') }>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        There are
                        <Typography variant="h5" color="primary" component="div">
                        {setJobIssueListReducer.length}
                        </Typography>
                        issues with current job listings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <i>click to view</i>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default NewIssues