import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { 
    Button, 
    TableRow,
    TableCell,    
    Link,
} from '@mui/material';

function JobIssuesReviewItem({issue}) {

    const dispatch = useDispatch();

    console.log('what is issue?', issue);

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
                <TableCell>{issue.job_city}, &nbsp;{issue.job_state}</TableCell>
                <TableCell>{issue.date_posted}</TableCell>
                <TableCell>{issue.description}</TableCell>
                <TableCell>
                    <Link href={issue.application_link} underline="hover">{issue.application_link}</Link>
                </TableCell>
                <TableCell>{issue.issue_type}</TableCell>
                <TableCell>{issue.issues_email}</TableCell>
                <TableCell>{issue.is_resolved}</TableCell>
                {/* <TableCell>
                    {(job.share_contact) ? (
                        <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                    ) : (
                        <></>
                    )}
                </TableCell> */}
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