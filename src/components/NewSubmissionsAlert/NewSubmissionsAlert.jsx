import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    TextField,
    Box,
    Button,
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

    // const bull = (
    //     <Box
    //       component="span"
    //       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    //     >
    //       •
    //     </Box>
    //   );

    return(
        <Card sx={{ minWidth: 275 }}>
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