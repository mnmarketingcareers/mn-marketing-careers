import { useDispatch, useSelector } from 'react-redux';
import { 
    CircularProgress, 
    Button, 
} from '@mui/material';

function PostingsList ({job}) {

    const dispatch = useDispatch();
    // const showJobPosting = job ? true : false;
    const handleApprove = (idToApprove) => {
        dispatch({
            type: 'APPROVE_POSTING', 
            payload: { 
                id: idToApprove, 
                status: 'APPROVED' 
            }
        });
    }

    const handleDeny = (idToDeny) => {
        dispatch({ 
            type: 'DELETE_POSTING', 
            payload: {id: idToDeny}
        });
    }

    return (
        <>
            <li>
                {job.available_role}, &nbsp;
                {job.company_name}, &nbsp;
                {job.description}, &nbsp;
                <a href={job.application_link}>Click here to apply!</a>, &nbsp;
                {job.job_city}, &nbsp;
                {job.job_state}, &nbsp;
                {job.remote}, &nbsp;
                {(job.share_contact) ? (
                    <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                ) : (<></>)}
                {job.date_posted} &nbsp; &nbsp; | &nbsp; &nbsp;
                <label htmlFor="approve-btn">Approve without posting to list --></label>
                <Button id="approve-btn" onClick={handleApprove(job.id)}>Approve</Button>
                <label htmlFor="deny-btn">Deny and delete posting --></label>
                <Button id="deny-btn" onClick={handleDeny(job.id)}>Deny</Button>
            </li>
        
        
        
        </>
    )
}

export default PostingsList;