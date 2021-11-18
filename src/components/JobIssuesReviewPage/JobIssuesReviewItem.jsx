import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { 
    Button, 
    TableRow,
    TableCell,    
    Link,
} from '@mui/material';

function JobIssuesReviewItem({issue}) {

    const dispatch = useDispatch();

    // define button handlers

    // const handleEdit = () => {
    //     dispatch({
    //         type: 'EDIT_POSTING',
    //         payload: rowToEdit
    //     });
    // }

    const handleDelete = () => {
        dispatch({ 
            type: 'DELETE_POSTING', 
            payload: {id: issue.id}
        });
    }

    return (
        <>
            <TableRow>
                <TableCell>{issue.available_role}</TableCell>
                <TableCell>{issue.company_name}</TableCell>
                <TableCell>{issue.description}</TableCell>
                <TableCell>
                    <Link href={issue.application_link} underline="hover">{issue.application_link}</Link>
                </TableCell>
                <TableCell>{issue.job_city}, &nbsp;{issue.job_state}</TableCell>
                <TableCell>{issue.array_agg}</TableCell>
                <TableCell>{issue.remote}</TableCell>
                {/* <TableCell>
                    {(job.share_contact) ? (
                        <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                    ) : (
                        <></>
                    )}
                </TableCell> */}
                <TableCell>{issue.date_posted}</TableCell>
                <TableCell>
                    {/* <Button color="success" variant="outlined" id="edit-btn" onClick={handleEdit}>Edit</Button> */}
                    <br />
                    <Button color="error" variant="outlined" id="delete-btn" onClick={handleDelete}>Delete</Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default JobIssuesReviewItem;