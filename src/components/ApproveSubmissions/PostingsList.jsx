
import { CircularProgress } from '@mui/material';

function PostingsList ({job}) {

    const showJobPosting = job ? true : false;
    return (
        <>
            {showJobPosting && <CircularProgress />}

            {!showJobPosting && (
            <li>
                {job.}
            </li>)}
        </>
    )
}