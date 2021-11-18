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
import Button from '@mui/material/Button';
import Modal from "../Modal/Modal.jsx";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHeader, TableHead, TableRow, Paper, TableSortLabel, Link } from '@mui/material/';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import './Main.css';
import RemoteJobs from '../RemoteJobs/RemoteJobs.jsx';
import Internships from '../Internships/Internships.jsx';


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
        const link = event.target.value;
        <a href="`${link}`" />

    }



    const rows = useSelector((store) => store.setJobsReducer);
    const recentJobs = useSelector(store => store.setRecentJobs);

    // The application field column will render a button that will take user to link wether the employer has put in a 'https' or not.

    const columns = [
        { field: 'company_name', headerName: 'Company', width: 150 },
        { field: 'date_posted', headerName: 'Date', width: 110 },
        { field: 'available_role', headerName: 'Available role', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        {
            field: 'application_link', headerName: 'Link', width: 150, renderCell: (params) => {
                if (params.row.application_link.includes('http')) {
                    return <button className="apply-button"><a href={`${params.row.application_link}`} target="_blank">Apply</a></button>
                } else {
                    return <button className="apply-button"><a href={`https://${params.row.application_link}`} target="_blank">Apply</a></button>
                }
            }
        },
        { field: 'job type', headerName: 'Job Type', width: 400 },
    ];

    useEffect(() => {
        dispatch({ type: 'FETCH_MAIN_JOBS' });
    }, []);

// Fetches jobs by date.
    const fetchRecentJobs = (event) => {
        console.log('what is event?', event);
        dispatch({ type: 'FETCH_RECENT_JOBS', payload: { age: event } })
        dispatch({ type: 'FETCH_RECENT_REMOTE_JOBS', payload: { age: event } })
    }

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
                    <div className="top-of-table"><h2>Companies Hiring</h2>
                    </div>

                    {openModal ? <p></p> :
                        <>
                            <span>See jobs posted within the last</span>
                            <div className="filter">
                                <Button variant="outlined" onClick={() => fetchRecentJobs('1')}>
                                    24 hours
                                </Button>
                                <Button variant="outlined" onClick={() => fetchRecentJobs('3')}>
                                    3 days
                                </Button>
                                <Button variant="outlined" onClick={() => fetchRecentJobs('7')}>
                                    7 days
                                </Button>
                                <Button variant="outlined" onClick={() => fetchRecentJobs('14')}>
                                    14 days
                                </Button>
                                <Button variant="outlined" onClick={() => fetchRecentJobs('30')}>
                                    30 days
                                </Button>
                            </div>
                            {/* <ul> */}
                                {/* <li>{JSON.stringify(recentJobs)}</li> */}
                                {/* {recentJobs.map((job) => (
                                    <li>{job.date_posted}</li> */}
                                {/* ))} */}
                            {/* </ul> */}
                        </>
                    }
                    {/* openModal conditional statements are put there to hide the page when user clicks on 'Subscribe' and the modal appears. */}
                    {openModal ? <p></p> :
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
                    }
                    {openModal ? <p></p> :
                        <div className="top-of-table"><h2>Remote Opportunities</h2></div>
                    }
                    {openModal ? <p></p> : <RemoteJobs />}
                    <div className="top-of-table"><h2>Internships</h2></div>
                    {openModal ? <p></p> : <Internships />}
                </div>
            </div>
        </>
    )



}

export default Main;