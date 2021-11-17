import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import FormGroup from '@mui/material/FormGroup';
// import Card from '@mui/material/Card';
// import Grid from '@mui/material/Grid';
// import CardHeader from '@mui/material/CardHeader';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import CardContent from '@mui/material/CardContent';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
import { Button } from '@material-ui/core';
import { GridRenderCellParams } from '@mui/x-data-grid';
import Modal from "../Modal/Modal.jsx";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHeader, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material/';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import './Main.css';
import  RemoteJobs from '../RemoteJobs/RemoteJobs.jsx';


function Main() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false)

    const toEmployerPage = () => {
        history.push('/employerpage')
    }

    const testApply = (event) => {
        console.log('in button, what is event.target.params', event.target.params);
        console.log('in button, what is params', event.target.params);
       const link = event.target.value ;
       <a href="`${link}`"/>

    }
    
    const rows = useSelector((store) => store.setJobsReducer);
    

    //check what's in this reducer
    console.log('what is in setJobsReducer', rows);

    // useparams history.push
    const toIssuePage = (rowId) => {
        history.push(`/jobpostingissue/${rowId}`)
    }


// The application field column will render a button that will take user to link wether the employer has put in a 'https' or not.

    const columns = [
        { field: 'company_name', headerName: 'company', width: 150 },
        { field: 'date_posted', headerName: 'date', width: 110 },
        { field: 'available_role', headerName: 'available role', width: 150 },
        { field: 'description', headerName: 'description', width: 150 },
        { field: 'application_link', headerName: 'link', width: 150, renderCell: (params) => {
                                            if(params.row.application_link.includes('http')){
                                                return <button><a href={`${params.row.application_link}`} target="_blank">Apply</a></button>
                                            } else {
                                                return <button><a href={`https://${params.row.application_link}`} target="_blank">Apply</a></button> 
                                            }
                                            }},
        { field: 'array_agg', headName: 'array_agg', width: 350 },
        { field: 'id', headerName: 'Any Issues?', width: 150, renderCell: (params) => { 
            return  <Button variant="contained" color="primary" size="small" 
            onClick={() => toIssuePage(params.row.id)}> Report Issue </Button>  
        }},
    ];                                                                               

    // useEffect(() => {
    const grabData = (event) => {
        dispatch({ type: 'FETCH_MAIN_JOBS' });

    }
    // }, []);

    // call toIssuePage within grid?
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
                <button onClick={grabData}>Test</button>
                {openModal && <Modal closeModal={setOpenModal} />}
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
                    <div className="top-of-table"><h2>Companies Hiring</h2></div>
                    {openModal ? <p></p> : 
                      
                        
                      <div style={{ height: 600, width: '100%' }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        checkboxSelection
                        disableSelectionOnClick
                      />
                    </div>
                    }
                    <div className="top-of-table"><h2>Remote Opportunities</h2></div>
                    <RemoteJobs />
                    <div className="top-of-table"><h2>Internships</h2></div>
                </div>
            </div>
        </>
    )



}

export default Main;