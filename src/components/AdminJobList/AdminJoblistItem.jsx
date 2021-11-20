import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Button, 
    TableRow,
    TableCell,    
    Link,
} from '@mui/material';

function AdminJobListItem ({job}) {
    // set React hooks
    const history = useHistory();
    const dispatch = useDispatch();

    // define button handlers
    const handleEdit = () => {
        // dispatch({
        //     type: 'EDIT_POSTING',
        //     payload: rowToEdit
        // });
        history.push(`/editpage/${job.id}`)
    }

    const handleDelete = () => {
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
                    <Button color="success" variant="outlined" id="edit-btn" onClick={handleEdit}>Edit</Button>
                    <br />
                    <Button color="error" variant="outlined" id="delete-btn" onClick={handleDelete}>Delete</Button>
                </TableCell>
            </TableRow>
        </>
    )
}

export default AdminJobListItem