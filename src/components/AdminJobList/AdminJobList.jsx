import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Modal from "../Modal/Modal.jsx";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import './AdminJobList.css';



function AdminJobList() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false)

    const toEmployerPage = () => {
        history.push('/employerpage')
    }

    const { approvedPostings } = useSelector(store => store);
    //1 DATA FROM SERVER
    const rows = useSelector((store) => store.setJobsReducer);

    const columns = [
        { field: 'company_name', headerName: 'company', width: 150 },
        { field: 'date_posted', headerName: 'date', width: 150 },
        { field: 'available_role', headerName: 'available role', width: 150 },
        { field: 'description', headerName: 'description', width: 150 },
        { field: 'application_link', headerName: 'link', width: 150 },
        { field: 'job_city', headername: 'city', width: 150},
        { field: 'job_state', headername: 'state', width: 150},
        { field: 'array_agg', headername: 'job types', width: 150},
        { field: 'remote', headername: 'remote', width: 150},
        { field: 'hiring_contact_email', headername: 'hiring contact', width: 150},
    ];

    useEffect(() => {
    // const grabData = (event) => {
        dispatch({ type: 'FETCH_MAIN_JOBS' });
        dispatch({ type: 'FETCH_APPROVED_POSTINGS'});
    // }
    }, []);


    const handleEdit = (id) => {
        // go to edit page
        console.log('eventually');
    }

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_POSTING', payload: {id: id} });
    }

    const handlePostToList = () => {
        dispatch({ type: 'POST_APPROVED_JOBS'});
        history.go(0);
    }

    return (
        <>
            <div className="parent">
                <div className="logo">
                    <h1>Job postings</h1>
                    
                </div>
                {/* <p>{JSON.stringify(rows)}</p> */}
                {/* <button onClick={grabData}>Test</button> */}
                {openModal && <Modal closeModal={setOpenModal} />}
                
            </div>
            <div className="tables-container">
                <h2>Job posts you've approved, ready to go to the list</h2>
            <Button variant="outlined" extended onClick={handlePostToList}>Post All approved jobs to list</Button>
                {/* {JSON.stringify(approvedPostings)} */}
                <div className="job-postings-table">
                    <ul>
                        {approvedPostings.map((job) => {
                            return(
                                <li key={job.id}>
                                    {job.available_role}, &nbsp;
                                    {job.company_name}, &nbsp;
                                    {job.description}, &nbsp;
                                    <a href={job.application_link}>Click here to apply!</a>, &nbsp;
                                    {job.job_city}, &nbsp;
                                    {job.job_state}, &nbsp;
                                    {job.remote}, &nbsp;
                                    {(job.share_contact) ? (
                                        <p>{job.hiring_contact_email, job.hiring_contact_name, job.title, job.phone}</p>
                                    ) : (<></>)}
                                    {job.date_posted} &nbsp; &nbsp; | &nbsp; &nbsp;
                                    <label htmlFor="edit-btn"></label>
                                    <Button id="edit-btn" onClick={() => handleEdit(job.id)}>Edit</Button> 
                                    <Button onClick={() => handleDelete(job.id)}>JK, Delete it</Button>   
                                </li>
                            )
                            })}
                    </ul>
                </div>
            </div>
            <div className="links-container">
                {/* <div className="subscribe">
                    Receive this email from a friend?
                    Sign up to receive our weekly email update <button onClick={() => { setOpenModal(true) }}>Subscribe</button>
                </div> */}
                <div className="submit">
                    {/* Submit open positions to be included in an upcoming update <button onClick={toEmployerPage}>Submit</button> */}
                    {openModal ? <p></p> : 
                      
                        
                      <div style={{ height: 400, width: '100%' }}>
                      <div className="top-of-table"><h2>Jobs already posted</h2></div>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                      />
                    </div>
                    }




                </div>

            </div>
        </>
    )



}

export default AdminJobList;