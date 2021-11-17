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
        // { field: 'array_agg', headName: 'array_agg', width: 350},
        { field: 'array_agg', headName: 'array_agg', width: 350 },
        { field: 'id', headerName: 'Any Issues?', width: 150, renderCell: (params) => { 
            return  <Button variant="contained" color="primary" size="small" 
            onClick={() => toIssuePage(params.row.id)}> Report Issue </Button>   
        }},
    ];                                                                 

    // useEffect(() => {
    const getRemoteJobs = () => {
        dispatch({ type: 'FETCH_REMOTE_JOBS' });
    }
    // }, []);
   

    return (
        <>
            <button onClick={getRemoteJobs}>Test Remote Jobs</button>
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

        </>
    )

};

export default RemoteJobs;