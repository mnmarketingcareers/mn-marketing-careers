import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ApproveSubmissions.css';
import PostingsList from './PostingsList';
import ReadyToPost from '../ReadyToPostList/ReadyToPostList';
import { 
    CircularProgress,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
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
        <div className="pending-jobs-container">
            <h1>Review Job Openings</h1>
            
            <ReadyToPost />
    
            <h2>These job openings were submitted by employers and await your APPROVAL</h2>
            <p><b>NOTE:</b> Clicking "APPROVE" will <b>not</b> post job openings to the main list right away. They will simply be ready and waiting to go live when you click the "GO LIVE" button.</p>
            <p>Clicking "DENY" will permanently delete the request to post a job opening.</p>
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
                            <TableCell>Job Type</TableCell>
                            <TableCell>Remote?</TableCell>
                            <TableCell>Application Contact info</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell>Approve or Deny</TableCell>                                
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postingsList.map((job, i) => {
                            return(
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