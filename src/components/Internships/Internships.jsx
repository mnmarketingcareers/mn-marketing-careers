import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Modal from "../Modal/Modal.jsx";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHeader, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material/';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import './Internships.css';

function Internships() {

    const dispatch = useDispatch();

    const rows = useSelector((store) => store.setInternshipsReducer); 

 

    const columns = [
        { field: 'company_name', headerName: 'Company', width: 150 },
        { field: 'date_posted', headerName: 'Date', width: 110 },
        { field: 'available_role', headerName: 'Available role', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'application_link', headerName: 'Link', width: 150, renderCell: (params) => {
                                            if(params.row.application_link.includes('http')){
                                                return <button className="apply-button"><a href={`${params.row.application_link}`} target="_blank">Apply</a></button>
                                            } else {
                                                return <button className="apply-button"><a href={`https://${params.row.application_link}`} target="_blank">Apply</a></button> 
                                            }
                                            }},
        { field: 'array_agg', headName: 'Job Field', width: 350},
    ];                                                                 

    useEffect(() => {
        dispatch({ type: 'FETCH_INTERNSHIPS' });
    }, []);
   

    return (
        <>
            {/* <button onClick={getRemoteJobs}>Test Remote Jobs</button> */}
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

export default Internships;