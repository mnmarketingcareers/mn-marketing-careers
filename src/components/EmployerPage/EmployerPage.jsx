import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Snackbar button
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Google ReCaptcha import
import ReCaptchaV2 from 'react-google-recaptcha';


import './EmployerPage.css';

function EmployerPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    // On the question : "Is this job remote?"; toggles whether other input field is displayed or not.
    const [toggleOther, setToggleOther] = useState(true);

    const changeState = () => {
        setToggleOther(!toggleOther)
    };

    // On the question: "Can we share contact person?"; toggles the input fields necessary to add person's contact info.
    const [toggleContact, setToggleContact] = useState(true);

    const changeContactView = () => {
        setToggleContact(!toggleContact)
    };

    // Success Button toggle

    const [open, setOpen] = useState(false);

    // Data to be dispatched to job_postings, hiring_contact, and company tables in mn_marketing_careers database.
    const [jobPostingsTable, setJobPostingsTable] = useState({
        posting_contact_name: '',
        posting_contact_email: '',
        company: '',
        available_role: '',
        application_link: '',
        description: '',
        job_city: '',
        job_state: '',
        remote: '',
        share_contact: '',
        name: '',
        email: '',
        title: '',
        phone: '',
        job_types: []

    });

    const submitEmployerJob = (event) => {
        event.preventDefault();
        console.log('what is jobPostingsTable', jobPostingsTable)
        dispatch({
            type: 'NEW_EMPLOYER_JOB_POST',
            payload: jobPostingsTable
        });
        setOpen(true); setTimeout(() => {
           history.push('/main')
        }, 1000);
    };


// For the Snackbar button when Submit is pressed.
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

// For the Snackbar button when Submit is pressed.
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

    // For the Snackbar button when Submit is pressed.
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });




    const setValues = (propertyName) => (event) => {
        console.log('what is propertyName', propertyName);
        console.log('what is event.target.value', event.target.value);
        setJobPostingsTable({ ...jobPostingsTable, [propertyName]: event.target.value });
    };


    // Two functions for the "Can we share a contact person?"
    const shareContact = (event) => {
        console.log('what is event', event.target.value)
        console.log('in yes')
        setJobPostingsTable({ ...jobPostingsTable, share_contact: true });
        changeContactView();
    };


    const dontShareContact = (event) => {
        console.log('what is event', event.target.value)
        console.log('in no');
        setJobPostingsTable({
            ...jobPostingsTable, share_contact: false,
            name: '',
            email: '',
            title: '',
            phone: '',
        });
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        {
            order: 1,
            field: ' Account Management'
        },
        {
            order: 2,
            field: ' Advertising'
        },
        {
            order: 3,
            field: ' Branding'
        },
        {
            order: 4,
            field: ' Communications'
        },
        {
            order: 5,
            field: ' Copywriting'
        },
        {
            order: 6,
            field: ' Digital Media'
        },
        {
            order: 7,
            field: ' Graphic Design'
        },
        {
            order: 8,
            field: ' Marketing'
        },
        {
            order: 9,
            field: ' Public Relations'
        },
        {
            order: 10,
            field: ' Social Media'
        },
        {
            order: 11,
            field: ' Editorial'
        },
        {
            order: 12,
            field: ' Ecommerce'
        },
        {
            order: 13,
            field: ' Project Management'
        },
        {
            order: 14,
            field: ' Internship'
        },
    ];

    /**
     * Adds the token to the form object
     *
     * @param {string} token - response from ReCaptcha
     */
    const handleToken = (token) => {
        setJobPostingsTable((jobPostingsTable) => {
        return { ...jobPostingsTable, token }
        });
    }

    /**
     * Removes the token from the from object
     */
    const handleExpire = () => {
        setJobPostingsTable((jobPostingsTable) => {
        return { ...jobPostingsTable, token: null }
        });
    }

    const [job, setJob] = useState([]);

    const handleJob = (event) => {
        const {
            target: { value },
        } = event;
        setJob(
            // On autofill we get the stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
        setJobPostingsTable({ ...jobPostingsTable, job_types: value });
    };

    const toAbout = (event) => {
        history.push('/about');
    }

    const showtSitekey = (event) => {
        event.preventDefault();
        console.log(process.env.REACT_APP_SITE_KEY);
    }

    return (
        <>

            <div className="form-container">
                <form className="employer-form" onSubmit={submitEmployerJob}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Hiring? Submit a job" />
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="./images/employerform.jpeg"
                                    sx={{ borderRadius: 3 }}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        Minnesota Marketing Careers is a weekly email update dedicated to sharing marketing, communications and digital career opportunities with Minnesota-based
                                        companies.Remote positions and internships included.Submit opportunities within your organization including advertising, marketing, public relations,
                                        UX/software development, communications and digital.
                                    </Typography>
                                    <Typography padding="2" variant="body2" color="text.secondary">
                                        Curated by Minnesota-based Recruiter, Elizabeth Laukka and Marketing Consultant, Casey Tilli.
                                        Questions?  Reach us at <a href="mnmarketingcareers@gamil.com">mnmarketingcareers@gmail.com</a>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small" onClick={toAbout}>Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="Your name" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    id="poster-name"
                                    variant="standard"
                                    placeholder="name"
                                    className="poster-name"
                                    onChange={setValues('posting_contact_name')}
                                    value={jobPostingsTable.posting_contact_name} ></TextField>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="Your email" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    id="poster-email"
                                    variant="standard"
                                    placeholder="email"
                                    className="poster-email"
                                    onChange={setValues('posting_contact_email')}
                                    value={jobPostingsTable.posting_contact_email} ></TextField>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="Company Name" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    id="company"
                                    variant="standard"
                                    placeholder="company"
                                    className="company"
                                    onChange={setValues('company')}
                                    value={jobPostingsTable.company} ></TextField>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="Title of Position Available" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    placeholder="title"
                                    variant="standard"
                                    className="title"
                                    onChange={setValues('available_role')}
                                    value={jobPostingsTable.available_role} ></TextField>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="Link to Job Post Online" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    placeholder="link"
                                    variant="standard"
                                    className="application-link"
                                    onChange={setValues('application_link')}
                                    value={jobPostingsTable.application_link} ></TextField>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="Description" />
                                &nbsp;
                                <TextField
                                    multiline rows={4}
                                    sx={{ m: 1, width: 450 }}
                                    type="text"
                                    placeholder="Description"
                                    variant='outlined'
                                    className="description"
                                    onChange={setValues('description')}
                                    value={jobPostingsTable.description} ></TextField>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="Select job types (Multiple selections allowed)" />
                                <div>
                                    <FormControl sx={{ m: 1.1, width: 300 }}>
                                        <InputLabel id="job-types">types</InputLabel>
                                        <Select
                                            labelId="job-types"
                                            id="job-types"
                                            multiple
                                            value={job}
                                            onChange={handleJob}
                                            input={<OutlinedInput label="Types" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem key={name.field} id={name.field} value={name.field}>
                                                    <Checkbox checked={job.indexOf(name.field) > -1} />
                                                    <ListItemText primary={name.field} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </Card>
                        </Grid>

                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="City" />
                                &nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    placeholder="City"
                                    variant="standard"
                                    className="city"
                                    onChange={setValues('job_city')}
                                    value={jobPostingsTable.job_city} ></TextField>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="State" />
                                &nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    placeholder="State"
                                    variant="standard"
                                    className="state"
                                    onChange={setValues('job_state')}
                                    value={jobPostingsTable.job_state} ></TextField>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="&nbsp;Is this job remote?" />
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="Is this job remote?"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel placeholder="remote-yes" value="yes" onClick={setValues('remote')} control={<Radio />} label="Yes" />
                                        <FormControlLabel placeholder="remote-no" value="no" onClick={setValues('remote')} control={<Radio />} label="No" />
                                        <FormControlLabel value="other" onClick={changeState} control={<Radio />} label="Other" />
                                        {toggleOther ? <p></p> : <div><TextField className="other" variant="standard" placeholder="details" onChange={setValues('remote')} ></TextField></div>}
                                    </RadioGroup>
                                </FormControl>
                            </Card>
                        </Grid>

                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="&nbsp;Can we share a contact person" />
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="Can we share a contact person?"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel placeholder="yes" value="yes" onClick={shareContact} control={<Radio />} label="Yes" />
                                        {toggleContact ? <p></p> : <div><TextField className="hiring-contact-name" variant="standard" placeholder="name" onChange={setValues('name')} ></TextField>&nbsp;&nbsp;
                                            &nbsp;<TextField className="hiring-contact-email" variant="standard" placeholder="email" onChange={setValues('email')} ></TextField>&nbsp;
                                            &nbsp;<TextField className="hiring-contact-title" variant="standard" placeholder="title" onChange={setValues('title')} ></TextField>&nbsp;
                                            &nbsp;&nbsp;<TextField className="hiring-contact-phone" variant="standard" placeholder="phone" onChange={setValues('phone')} ></TextField></div>}
                                        <FormControlLabel placeholder="no" value="no" onClick={dontShareContact} control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Card>
                        </Grid>
                    </Grid>

                    <div className="recaptcha-container">
                        {/* <button onClick={showtSitekey}>Show SiteKey</button> */}
                        <ReCaptchaV2 sitekey={(process.env.REACT_APP_SITE_KEY)} 
                               onChange={handleToken}
                               onExpire={handleExpire}
                        />
                    </div>

                    <input className="submit-employer-form-button" type='submit' value='Submit' />
                </form>
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Job Submitted!
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}

export default EmployerPage;
