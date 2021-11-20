import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button
} from '@mui/material';

function ReadyToPost () {
    const history = useHistory();
    const dispatch = useDispatch();

    const { approvedPostings } = useSelector(store => store);

    useEffect( () => {
        dispatch({ type: 'FETCH_APPROVED_POSTINGS'});
    }, []);

    const handleEdit = (id) => {
        // go to edit page
        history.push(`/editpage/${id}`)
    }

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_POSTING', payload: {id: id} });
    }

    const handlePostToList = () => {
        dispatch({ type: 'POST_APPROVED_JOBS'});
        history.go(0);
    }

    return (
        <div>
            <h2>Job openings you've  added or approved, ready to go to the public list</h2>
            <p>Click here: <Button variant="outlined" extended onClick={handlePostToList}>Go Live</Button> if you want to post all new job openings below to the public list</p>
                {/* {JSON.stringify(approvedPostings)} */}
                <div className="job-postings-table">
                    <ul>
                        {approvedPostings.map((job) => {
                            return(
                                <li key={job.id}>
                                    {job.available_role}, &nbsp;
                                    {job.company_name}, &nbsp;
                                    {job.description}, &nbsp;
                                    <a href={`https://${job.application_link}`}>https://{job.application_link}</a>, &nbsp;
                                    {job.job_city}, &nbsp;
                                    {job.job_state}, &nbsp;
                                    {job.remote}, &nbsp;
                                    {(job.share_contact) ? (
                                        <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                                    ) : (<></>)}
                                    {job.date_posted} &nbsp; | &nbsp;
                                    <label htmlFor="edit-btn"></label>
                                    <Button id="edit-btn" variant="outlined" color="success" onClick={() => handleEdit(job.id)}>Edit</Button> 
                                    &nbsp;&nbsp;
                                    <Button id="delete-btn" variant="outlined" color="error" onClick={() => handleDelete(job.id)}>Delete</Button>   
                                </li>
                            )
                            })}
                    </ul>
                </div>
        </div>
    )
}

export default ReadyToPost;