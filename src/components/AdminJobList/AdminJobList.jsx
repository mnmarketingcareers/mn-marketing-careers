import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Button, 
    CircularProgress,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';

import { 
    DataGrid, 
    // GridRowsProp, 
    // GridColDef 
} from '@mui/x-data-grid';
import Modal from "../Modal/Modal.jsx";
import './AdminJobList.css';
import ReadyToPost from '../PeadyToPostList/ReadyToPostList.jsx';
import AdminJobListItem from './AdminJoblistItem.jsx';
function AdminJobList() {

    // const history = useHistory();
    const dispatch = useDispatch();
    const history = useHistory();
    // const [openModal, setOpenModal] = useState(false)

    //1 DATA FROM SERVER
    const rows = useSelector((store) => store.setJobsReducer);

    // const handleAddJob = () => {
    //     history.push("/adminaddjob");
    //   };

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
            {/* <Button variant="outlined"  onClick={() => dispatch({ type: 'POST_APPROVED_JOBS'})}>Post All approved jobs to list</Button> */}
            {/* {JSON.stringify(postingsList)} */}
            <h2>These job openings are currently on the public list, viewable by who goes to your page.</h2>
            {!showJoblist && <><p>No jobs to see here...</p><CircularProgress /></>}
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
                                // <li key={job.id}>{job.available_role}</li>
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

// for using DataGrid

// <div className="parent">
//                 <div className="logo">
//                     <h1>Job postings</h1>
                    
//                 </div>
//                 {/* <p>{JSON.stringify(rows)}</p> */}
//                 {/* <button onClick={grabData}>Test</button> */}
//                 {openModal && <Modal closeModal={setOpenModal} />}
                
//             </div>
//             <ReadyToPost />

//             <div className="links-container">
               
//                 <div className="submit">
                    
//                     {openModal ? <p></p> : 
                      
                        
//                       <div style={{ height: 400, width: '100%' }}>
//                       <div className="top-of-table"><h2>Jobs already posted</h2></div>
//                       <DataGrid
//                         rows={rows}
//                         columns={columns}
//                         pageSize={5}
//                         rowsPerPageOptions={[5]}
//                         checkboxSelection
//                         disableSelectionOnClick
//                       />
//                     </div>
//                     }

//                 </div>

//             </div>