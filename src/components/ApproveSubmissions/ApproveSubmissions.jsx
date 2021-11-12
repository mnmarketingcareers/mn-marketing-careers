import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PostingsList from './PostingsList';
import { CircularProgress } from '@mui/material';


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
            <p>This page has a list of all job postings submitted by employers through this website that have status "PENDING_APPROVAL"</p>
            {JSON.stringify(postingsList)}
            {!showJobPosting && <CircularProgress />}
            {showJobPosting &&
            (<ul>
                {postingsList.map((job, i) => {
                    return(
                        // <li key={job.id}>{job.available_role}</li>
                        <PostingsList key={job.id} job={job} />
                    )
                    })}

            </ul>)}
        </div>
    )
}

export default ApproveSubmissions;