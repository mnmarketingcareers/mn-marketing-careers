import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { 
    // Button, 
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

    // const [openModal, setOpenModal] = useState(false)

    //1 DATA FROM SERVER
    const rows = useSelector((store) => store.setJobsReducer);

    // const columns = [
    //     { field: 'company_name', headerName: 'company', width: 150 },
    //     { field: 'date_posted', headerName: 'date', width: 150 },
    //     { field: 'available_role', headerName: 'available role', width: 150 },
    //     { field: 'description', headerName: 'description', width: 150 },
    //     { field: 'application_link', headerName: 'link', width: 150 },
    //     { field: 'job_city', headername: 'city', width: 150},
    //     { field: 'job_state', headername: 'state', width: 150},
    //     { field: 'array_agg', headername: 'job types', width: 150},
    //     { field: 'remote', headername: 'remote', width: 150},
    //     { field: 'hiring_contact_email', headername: 'hiring contact', width: 150},
    // ];

    useEffect(() => {
        dispatch({ type: 'FETCH_MAIN_JOBS' });
    }, []);

    const showJoblist = rows ? true: false;

    return (
        <>
        <div>
            <h1>Job Postings</h1>
            
            <ReadyToPost />
            {/* <Button variant="outlined" extended onClick={() => dispatch({ type: 'POST_APPROVED_JOBS'})}>Post All approved jobs to list</Button> */}
            {/* {JSON.stringify(postingsList)} */}
            <h2>These job postings are currently on the main list, as seen by anyone who goes to your page.</h2>
            {!showJoblist && <CircularProgress />}
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