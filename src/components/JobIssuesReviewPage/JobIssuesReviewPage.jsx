import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { 
    // Button, 
    CircularProgress,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';
import JobIssuesReviewItem from './JobIssuesReviewItem';

function JobIssuesReviewPage() {
    const dispatch = useDispatch();

    // this reducer contains job issue data pulled from the database
    const jobIssueList = useSelector(store => store.setJobIssueListReducer);
    console.log('what is in job issue reducer?', jobIssueList);

    // on pageload, we want to initiate fetching job issue data from the database
    useEffect(() => {
        dispatch({type: 'FETCH_JOB_ISSUES'})
    }, [])

    const showJoblist = jobIssueList ? true: false;

    return (
        <>
        <div className="admin-joblist-container">
            <h1>Pending Issues</h1>
            
            {/* <Button variant="outlined" extended onClick={() => dispatch({ type: 'POST_APPROVED_JOBS'})}>Post All approved jobs to list</Button> */}
            {/* {JSON.stringify(postingsList)} */}
            <h2>This is a list of issues reported by job seekers.</h2>
            {!showJoblist && <CircularProgress />}
            {showJoblist &&
            (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Date Posted</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Issue Type</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Job Seeker Email</TableCell>
                            <TableCell>Resolved?</TableCell>
                            <TableCell>Delete Issue</TableCell>                                
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobIssueList.map((issue, i) => {
                            return(
                                <JobIssuesReviewItem key={issue.id} issue={issue} />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>)}
        </div>
            
        </>
    )
}

export default JobIssuesReviewPage;