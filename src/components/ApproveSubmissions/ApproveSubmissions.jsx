import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PostingsList from './PostingsList';
import { 
    CircularProgress,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    TableBody,
    Paper,
} from '@mui/material';


function ApproveSubmissions() {
    //set imported hooks
    const postingsList = useSelector(store => store.pendingPostings);
    const dispatch = useDispatch();

    // on page load, useEffect to fetch all rows from job postings with status "PENDING_APPROVAL"
    useEffect( () => {
        dispatch({
            type: 'FETCH_PENDING_POSTINGS',
        });
    }, [])

    const showJobPosting = postingsList ? true : false;

    return(
        <div>
            <h1>Review Job Postings</h1>
            <p>These job postings were submitted by employers and await your APPROVAL</p>
            {/* {JSON.stringify(postingsList)} */}
            {!showJobPosting && <CircularProgress />}
            {showJobPosting &&
            (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Job Location</TableCell>
                            <TableCell>Remote?</TableCell>
                            <TableCell>Application Contact info</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell>Approve or Deny</TableCell>                                
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postingsList.map((job, i) => {
                            return(
                                // <li key={job.id}>{job.available_role}</li>
                                <PostingsList key={job.id} job={job} />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>)}
        </div>
    )
}

export default ApproveSubmissions;