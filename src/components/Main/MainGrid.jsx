import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { format, compareAsc, parseISO } from 'date-fns';
import moment from 'moment';

function MainGrid ({ rows }) {

    const history = useHistory();
    const testApply = (event) => {
        console.log('in button, what is event.target.params', event.target.params);
        console.log('in button, what is params', event.target.params);
        const link = event.target.value;
        <a href="`${link}`" />

    }

    // useparams history.push
    const toIssuePage = (rowId) => {
        history.push(`/jobpostingissue/${rowId}`)
    }
    
    // renderCell: (params) => {return(moment(params.row.date_posted).format('MMM Do YY')))}

    // The application field column will render a button that will take user to link wether the employer has put in a 'https' or not.
    const columns = [
        { field: 'company_name', headerName: 'company', width: 150 },
        { field: 'date_posted', headerName: 'date', width: 110, renderCell: (params) => {return(moment(params.row.date_posted).format('MMM Do YY'))} },
        { field: 'available_role', headerName: 'available role', width: 150 },
        { field: 'description', headerName: 'description', width: 150 },
        {
            field: 'application_link', headerName: 'link', width: 150, renderCell: (params) => {
                if (params.row.application_link.includes('http')) {
                    return <Button style={{ backgroundColor: '#E7F2F8' }} variant="contained"><a style={{ color: 'black', fontWeight: '500' }} href={`${params.row.application_link}`} target="_blank">Apply</a></Button>
                } else {
                    return <Button style={{ backgroundColor: '#E7F2F8' }} variant="contained"><a style={{ color: 'black', fontWeight: '500' }} href={`https://${params.row.application_link}`} target="_blank">Apply</a></Button>
                }
            }
        },
        { field: 'job_type', headName: 'Job Field', width: 350 },
        {
            field: 'id', headerName: 'Any Issues?', width: 150, renderCell: (params) => {
                return <Button variant="contained" style={{ backgroundColor: '#FFA384', color: 'white', fontWeight: '600' }} size="small"
                    onClick={() => toIssuePage(params.row.id)}> Report Issue </Button>
            }
        },
    ];


    return (
        <>
        
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
}

export default MainGrid;