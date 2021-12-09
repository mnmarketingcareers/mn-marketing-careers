import { useDispatch } from 'react-redux';
import { 
    Button, 
    TableRow,
    TableCell,    
    Link,
} from '@mui/material';

function PostingsList ({job}) {

    const dispatch = useDispatch();

    const handleApprove = () => {
        dispatch({
            type: 'APPROVE_POSTING', 
            payload: { 
                id: job.id, 
                status: 'APPROVED' 
            }
        });
    }

    const handleDeny = () => {
        dispatch({ 
            type: 'DELETE_POSTING', 
            payload: {id: job.id}
        });
    }

    return (
        <>
            <TableRow>
                <TableCell>{job.available_role}</TableCell>
                <TableCell>{job.company_name}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>
                    <Link href={job.application_link} underline="hover">{job.application_link}</Link>
                </TableCell>
                <TableCell>{job.job_city}, &nbsp;{job.job_state}</TableCell>
                <TableCell>{job.array_agg}</TableCell>
                <TableCell>{job.remote}</TableCell>
                <TableCell>
                    {(job.share_contact) ? (
                        <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                    ) : (
                        <></>
                    )}
                </TableCell>
                <TableCell>{job.date_posted}</TableCell>
                <TableCell>
                    <Button color="success" variant="outlined" id="approve-btn" onClick={handleApprove}>Approve</Button>
                    <br />
                    <Button color="error" variant="outlined" id="deny-btn" onClick={handleDeny}>Deny</Button>
                </TableCell>
            </TableRow>
        </>
    )
}

export default PostingsList;