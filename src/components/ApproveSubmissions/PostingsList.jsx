
import { CircularProgress } from '@mui/material';

function PostingsList ({job}) {

    // const showJobPosting = job ? true : false;
    return (
        <>
            <li>
                {job.available_role}, &nbsp;

                {job.description}, &nbsp;
                <a href={job.application_link} />, &nbsp;
                {job.job_city}, &nbsp;
                {(job.share_contact) ? (
                    <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                ) : (<></>)}
            </li>
        </>
    )
}

export default PostingsList;