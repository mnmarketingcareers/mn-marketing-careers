import { useDispatch } from 'react-redux';
import { 
    Button, 
    TableRow,
    TableCell,    
    Link,
} from '@mui/material';

function JobIssuesReviewItem({issue}) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch({ 
            type: 'DELETE_ISSUE', 
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
                <TableCell>
                    <Link href={issue.application_link} underline="hover">{issue.application_link}</Link>
                </TableCell>
                <TableCell>{issue.issue_type}</TableCell>
                <TableCell>{issue.comment}</TableCell>
                <TableCell>{issue.issues_email}</TableCell>
                <TableCell>
                    <br />
                    <Button color="error" variant="outlined" id="delete-btn" onClick={handleDelete}>Delete</Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default JobIssuesReviewItem;