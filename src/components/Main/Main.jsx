import React from 'react';
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
import MainGrid from './MainGrid.jsx';
import RemoteJobs from '../RemoteJobs/RemoteJobs.jsx';
import Internships from '../Internships/Internships.jsx';
import useStyles from '../Styles/Styles';

// Snackbar button
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function Main() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false)

    const toEmployerPage = () => {
        history.push('/employerpage')
    }

    


    




    const rows = useSelector((store) => store.setJobsReducer);
    const recentJobs = useSelector(store => store.setRecentJobs);



    useEffect(() => {
        dispatch({ type: 'FETCH_MAIN_JOBS' });
    }, []);

    // Changes what the snackbar displayed depending on which filter button was pressed ie: Pressing the 7 days button
    // will have the snackbar display "Filtering by the last 7 days" and clicking the 3 days button will display 
    // "Filtering by the last 3 days" fetchRecentJobs is called.
    const [snackBarValue, setSnackBarValue] = useState('0')

    // Fetches jobs by date.
    const fetchRecentJobs = (event) => {
        setSnackBarValue(event);
        setOpen(true); 
        dispatch({ type: 'FETCH_RECENT_JOBS', payload: { age: event } });
        dispatch({ type: 'FETCH_RECENT_REMOTE_JOBS', payload: { age: event } });
        dispatch({ type: 'FETCH_RECENT_INTERNSHIPS', payload: { age: event } });
    }




    // For the snackbar button.
    const [open, setOpen] = useState(false);

    // For the Snackbar button when one of the date buttons in pressed.
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // For the Snackbar button when one of the date buttons in pressed.
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // For the Snackbar button when one of the date buttons in pressed.
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

    });


    return (
        <>
            <div className="parent">
                <div className="logo">
                    {/* <h1>LOGO</h1> */}
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
                        <MainGrid rows={rows} />
                    }
                    {openModal ? <p></p> :
                        <div className="top-of-table"><h2>Remote Opportunities</h2></div>
                    }
                    {openModal ? <p></p> : <RemoteJobs />}
                    <div className="top-of-table"><h2>Internships</h2></div>
                    {openModal ? <p></p> : <Internships />}
                </div>
            </div>
            <Stack spacing={2} sx={{ width: '350px' }}>
                <Snackbar open={open} autoHideDuration={1800} onClose={handleClose} TransitionComponent={Slide}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '350px' }}>
                        Filtering by the last {snackBarValue} days!
                    </Alert>
                </Snackbar>
            </Stack>

        </>
    )



}

export default Main;