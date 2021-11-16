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
        console.log('eventually');
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
            <h2>Job posts you've approved, ready to go to the list</h2>
            <Button variant="outlined" extended onClick={handlePostToList}>Post All approved jobs to list</Button>
                {/* {JSON.stringify(approvedPostings)} */}
                <div className="job-postings-table">
                    <ul>
                        {approvedPostings.map((job) => {
                            return(
                                <li key={job.id}>
                                    {job.available_role}, &nbsp;
                                    {job.company_name}, &nbsp;
                                    {job.description}, &nbsp;
                                    <a href={`https://${job.application_link}`}>Click here to apply!</a>, &nbsp;
                                    {job.job_city}, &nbsp;
                                    {job.job_state}, &nbsp;
                                    {job.remote}, &nbsp;
                                    {(job.share_contact) ? (
                                        <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                                    ) : (<></>)}
                                    {job.date_posted} &nbsp; &nbsp; | &nbsp; &nbsp;
                                    <label htmlFor="edit-btn"></label>
                                    <Button id="edit-btn" onClick={() => handleEdit(job.id)}>Edit</Button> 
                                    <Button onClick={() => handleDelete(job.id)}>JK, Delete it</Button>   
                                </li>
                            )
                            })}
                    </ul>
                </div>
        </div>
    )
}

export default ReadyToPost;