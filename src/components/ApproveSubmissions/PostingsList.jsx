
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
                {}
            </li>
        </>
    )
}

export default PostingsList;