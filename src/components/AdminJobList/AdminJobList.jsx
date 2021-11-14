import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

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

    // }
    }, []);


    return (
        <>
            <div className="parent">
                <div className="logo">
                    <h1>LOGO</h1>
                    <div>
                        In support of Minnesota’s marketing community, this weekly update is dedicated to sharing marketing
                        career opportunities with Minnesota-based companies. We invite you to review the opportunities below
                        and apply directly through the hiring company unless otherwise noted.
                    </div>
                </div>
                <p>{JSON.stringify(rows)}</p>
                {/* <button onClick={grabData}>Test</button> */}
                {openModal && <Modal closeModal={setOpenModal} />}
                <div className="top-of-table"><h2>Companies Hiring</h2></div>
            </div>
            <div className="tables-container">
                <div className="job-postings-table">
                </div>
            </div>
            <div className="links-container">
                <div className="subscribe">
                    Receive this email from a friend?
                    Sign up to receive our weekly email update <button onClick={() => { setOpenModal(true) }}>Subscribe</button>
                </div>
                <div className="submit">
                    Submit open positions to be included in an upcoming update <button onClick={toEmployerPage}>Submit</button>
                    {openModal ? <p></p> : 
                      
                        
                      <div style={{ height: 400, width: '100%' }}>
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