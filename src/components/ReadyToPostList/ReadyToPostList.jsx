import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Paper, Container,
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
        dispatch({ type: 'UNSET_JOBS' });
        dispatch({ type: 'FETCH_JOB_ID', payload: { job_posting_id: id } })
        history.push(`/editpage/${id}`)
    }

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_POSTING', payload: {id: id} });
        history.go(0);
    }

    const handlePostToList = () => {
        dispatch({ type: 'POST_APPROVED_JOBS'});
        history.go(0);
    }

    return (
        <div>
            <h2>Job openings you've  added or approved, ready to go to the public list</h2>
            <Paper>
            <p>Click here: <Button variant="outlined" onClick={handlePostToList}>Go Live</Button> <b>ONLY IF</b> you want to post all new job openings below to the public list</p>
                <Container className="job-postings-table">
                    <ul>
                        {approvedPostings.map((job) => {
                            return(
                                <li key={job.id}>
                                    <b>{job.available_role}</b> &nbsp;|&nbsp;
                                    {job.company_name} &nbsp;|&nbsp;
                                    {job.description} &nbsp;|&nbsp;
                                    <a href={`${job.application_link}`}>{job.application_link}</a> &nbsp;|&nbsp;
                                    {job.job_type} &nbsp;|&nbsp;
                                    {job.job_city} &nbsp;|&nbsp;
                                    {job.job_state} &nbsp;|&nbsp;
                                    <i>(remote?) &nbsp;</i>{job.remote} &nbsp;|&nbsp;
                                    {(job.share_contact) ? (
                                        <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                                    ) : (<></>)}
                                    {job.date_posted} &nbsp; || &nbsp;
                                    <label htmlFor="edit-btn"></label>
                                    <Button id="edit-btn" variant="outlined" color="success" onClick={() => handleEdit(job.id)}>Edit</Button> 
                                    &nbsp;|&nbsp;
                                    <Button id="delete-btn" variant="outlined" color="error" onClick={() => handleDelete(job.id)}>Delete</Button>   
                                </li>
                            )
                            })}
                    </ul>
                </Container>
            </Paper>
        </div>
    )
}

export default ReadyToPost;