import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Modal from "../Modal/Modal.jsx";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHeader, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material/';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';
import './RemoteJobs.css';

function RemoteJobs() {
    const history = useHistory();

    const dispatch = useDispatch();

    const rows = useSelector((store) => store.setRemoteJobsReducer);

    // useparams history.push
    const toIssuePage = (jobId) => {
        history.push(`/jobpostingissue/${jobId}`)
    }

    const columns = [
        { field: 'company_name', headerName: 'Company', width: 150 },
        { field: 'date_posted', headerName: 'Date', width: 110 },
        { field: 'available_role', headerName: 'Available role', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'application_link', headerName: 'Link', width: 150, renderCell: (params) => {
                                            if(params.row.application_link.includes('http')){
                                                return <Button style={{backgroundColor: '#E7F2F8'}} variant="contained"><a style={{color: 'black', fontWeight: '500'}} href={`${params.row.application_link}`} target="_blank">Apply</a></Button>
                                            } else {
                                                return <Button style={{backgroundColor: '#E7F2F8'}} variant="contained"><a style={{color: 'black', fontWeight: '500'}} href={`https://${params.row.application_link}`} target="_blank">Apply</a></Button> 
                                            }
                                            }},
        // { field: 'array_agg', headName: 'array_agg', width: 350},
        { field: 'job type', headName: 'Job Field', width: 350 },
        { field: 'id', headerName: 'Any Issues?', width: 150, renderCell: (params) => { 
            return  <Button style={{backgroundColor: '#FFA384', color: 'white', fontWeight: '600'}} variant="contained" color="primary" size="small" 
            onClick={() => toIssuePage(params.row.id)}> Report Issue </Button>   
        }},
        { field: 'job type', headName: 'Job Field', width: 350},
    ];                                                                 

    useEffect(() => {
        dispatch({ type: 'FETCH_REMOTE_JOBS' });
    }, []);
   

    return (
        <>
            {/* <button onClick={getInternships}>Test Remote Jobs</button> */}
            <div style={{ height: 500, width: '100%' }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        checkboxSelection
                        disableSelectionOnClick
                      />
            </div>

        </>
    )

};

export default RemoteJobs;