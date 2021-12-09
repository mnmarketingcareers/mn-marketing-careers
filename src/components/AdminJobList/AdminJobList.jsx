import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Button, 
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';
import './AdminJobList.css';
import ReadyToPost from '../ReadyToPostList/ReadyToPostList.jsx';
import AdminJobListItem from './AdminJoblistItem.jsx';
function AdminJobList() {

    const dispatch = useDispatch();
    const history = useHistory();

    //1 DATA FROM SERVER
    const rows = useSelector((store) => store.setJobsReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_MAIN_JOBS' });
    }, [dispatch]);

    const showJoblist = (rows.length > 0) ? true: false;

    return (
        <>
        <div className="admin-joblist-container">
            <h1>Job Postings</h1>
            
            <Button variant="contained" size="large" onClick={() => history.push("/adminaddjob")}>
                Add Some Jobs
            </Button>
            <ReadyToPost />
            <h2>These job openings are currently on the public list, viewable by who goes to your page.</h2>
            {!showJoblist && <><p>No jobs to see here...</p></>}
            {showJoblist &&
            (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Job Location</TableCell>
                            <TableCell>Job Type</TableCell>
                            <TableCell>Remote?</TableCell>
                            <TableCell>Application Contact info</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell>Approve or Deny</TableCell>                                
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((job, i) => {
                            return(
                                <AdminJobListItem key={job.id} job={job} />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>)}
        </div>
            
        </>
    )
}

export default AdminJobList;