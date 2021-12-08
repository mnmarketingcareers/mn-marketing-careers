import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
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
import JobIssuesReviewItem from './JobIssuesReviewItem';

function JobIssuesReviewPage() {
    const dispatch = useDispatch();

    // this reducer contains job issue data pulled from the database
    const jobIssueList = useSelector(store => store.setJobIssueListReducer);

    // on pageload, we want to initiate fetching job issue data from the database
    useEffect(() => {
        dispatch({type: 'FETCH_JOB_ISSUES'})
    }, [])

    // this variable contains a ternary operator
    // if the reducer data contained in jobIssueList is a "truthy" condition
    // a MUI circular progress bar will render on the page
    // otherwise, the data within the reducer will render on the page as a table
    const showJoblist = jobIssueList ? true: false;

    return (
        <>
        <div className="admin-issuelist-container">
            <h1>Pending Issues</h1>
            <h2>This is a list of issues reported by job seekers.</h2>
            {!showJoblist && <CircularProgress />}
            {showJoblist &&
            (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>City, State</TableCell>
                            <TableCell>Date Posted</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Issue Type</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Job Seeker Email</TableCell>
                            <TableCell>Delete Issue</TableCell>                                
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobIssueList.map((issue) => {
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