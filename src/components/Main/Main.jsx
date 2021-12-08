import  React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from "../Modal/Modal.jsx";
import './Main.css';
import MainGrid from './MainGrid.jsx';
import RemoteJobs from '../RemoteJobs/RemoteJobs.jsx';
import Internships from '../Internships/Internships.jsx';

// Snackbar button
import {Stack, Snackbar, Slide} from "@mui/material"
import MuiAlert from '@mui/material/Alert';

function Main() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false)

    const toEmployerPage = () => {
        history.push('/employerpage')
    }

    const rows = useSelector((store) => store.setJobsReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_MAIN_JOBS' });
    }, []);

    // Changes what the snackbar displayed depending on which filter button was pressed ie: Pressing the 7 days button
    // will have the snackbar display "Filtering by the last 7 days" and clicking the 3 days button will display 
    // "Filtering by the last 3 days" fetchRecentJobs is called.
    const [snackBarValue, setSnackBarValue] = useState('0')

    // Fetches jobs by date. The 3 different dispatches for the 3 different categories on the /main page.
    const fetchRecentJobs = (time) => {
        setSnackBarValue(time);
        setOpen(true); 
        dispatch({ type: 'FETCH_RECENT_JOBS', payload: { age: time } });
        dispatch({ type: 'FETCH_RECENT_REMOTE_JOBS', payload: { age: time } });
        dispatch({ type: 'FETCH_RECENT_INTERNSHIPS', payload: { age: time } });
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
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

    });

    return (
        <>
            <div className="parent">
                <div className="logo">
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
                    Sign up to receive our weekly email update <button className="submit-job-btn" onClick={() => { setOpenModal(true) }}>Subscribe</button>
                </div>
                <div className="submit">
                    Submit open positions to be included in an upcoming update <button className="submit-job-btn" onClick={toEmployerPage}>Submit</button>
                    <div className="top-of-table"><h2>Companies Hiring</h2>
                    </div>

                    {openModal ? <p></p> :
                        <>
                            <span className="filter-header"><h3>See jobs posted within the last:</h3></span>
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