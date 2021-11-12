import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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


    return(
        <div>
            <h1>Review Job Postings</h1>
            <p>This page has a list of all job postings submitted by employers through this website that have status "PENDING_APPROVAL"</p>
            {JSON.stringify(postingsList)}
            <ul>
                {postingsList.map((job, i) => {
                    return(
                        <li key={job.id}>{job}</li>
                    )
                    })}
                <li>job, title, company, state, etc.</li>
                <li>job, title, company, state, etc.</li>
                <li>job, title, company, state, etc.</li>
                <li>job, title, company, state, etc.</li>
                <li>job, title, company, state, etc.</li>
                <li>job, title, company, state, etc.</li>
                <li>job, title, company, state, etc.</li>
                <li>job, title, company, state, etc.</li>
            </ul>
        </div>
    )
}

export default ApproveSubmissions;