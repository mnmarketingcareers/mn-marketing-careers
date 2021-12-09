import React from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import moment from 'moment';

function MainGrid ({ rows }) {

    const history = useHistory();

    // useparams history.push
    const toIssuePage = (rowId) => {
        history.push(`/jobpostingissue/${rowId}`)
    }

    // The application field column will render a button that will take user to link wether the employer has put in a 'https' or not.
    const columns = [
        { field: 'company_name', headerName: 'Company', width: 150 },
        { field: 'date_posted', headerName: 'Date', width: 110, renderCell: (params) => {return(moment(params.row.date_posted).format('MMM Do YY'))} },
        { field: 'available_role', headerName: 'Available Role', width: 175 },
        { field: 'description', headerName: 'Description', width: 200 },
        {
            field: 'application_link', headerName: 'Link', width: 150, renderCell: (params) => {
                if (params.row.application_link.includes('http')) {
                    return <Button style={{ backgroundColor: '#E7F2F8' }} variant="contained"><a style={{ color: 'black', fontWeight: '500' }} href={`${params.row.application_link}`} target="_blank">Apply</a></Button>
                } else {
                    return <Button style={{ backgroundColor: '#E7F2F8' }} variant="contained"><a style={{ color: 'black', fontWeight: '500' }} href={`https://${params.row.application_link}`} target="_blank">Apply</a></Button>
                }
            }
        },
        { field: 'job_type', headerName: 'Job Type', width: 350 },
        {
            field: 'id', headerName: 'Any Issues?', width: 160, renderCell: (params) => {
                return <Button variant="contained" style={{ backgroundColor: '#FFA384', color: 'white', fontWeight: '600', padding: '0 6px' }} size="small"
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