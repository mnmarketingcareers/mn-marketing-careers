import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, 
        TextField, 
        Radio, 
        RadioGroup, 
        FormControl, 
        FormControlLabel, 
        InputLabel, 
        Select, 
        OutlinedInput, 
        MenuItem, 
        Checkbox, 
        ListItemText,
        Card, 
        Grid, 
        CardHeader } from "@mui/material";
import { useHistory } from "react-router";
import './AdminAddJobPage.css';

// Snackbar button
import {IconButton, Stack, Snackbar, Slide} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const AdminAddJobPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // "Is this job remote?": toggles whether other other input field is displayed or not. 
    const [toggleOther, setToggleOther] = useState(true);

    // "Can we share contact person?"; toggles the input fields necessary to add person's contact info.
    const [toggleContact, setToggleContact] = useState(true);

    // If allowed to share a contact, we can toggle to text fields to input that info
    const changeContactView = () => {
        setToggleContact(!toggleContact);
    };

    // Data to be dispatched to job_postings, hiring_contact, and company tables in mn_marketing_careers database.
    const defaultJobObject = {
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
        status: 'APPROVED',
        name: '',
        email: '',
        title: '',
        phone: '',
        job_types: []
    }
    const [jobPostingsObject, setJobPostingsObject] = useState(defaultJobObject);

    // Two functions for the "Can we share a contact person?"
    const shareContact = (event) => {
        setJobPostingsObject({ ...jobPostingsObject, share_contact: true });
        changeContactView();
    };

    // Push new job inputs to the database to be seen on the DOM in a different component
    // and clear input fields.
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_APPROVED_JOB_POST',
            payload: jobPostingsObject
        })
        setOpen(true);

        setTimeout(() => {
            history.go(0);
        }, 2000);
    }

    const setValues = (propertyName) => (event) => {
        setJobPostingsObject({ ...jobPostingsObject, [propertyName]: event.target.value });
        setToggleOther(true);
    }

    const handleDontShareContact = (event) => {
        setJobPostingsObject({
            ...jobPostingsObject, share_contact: false,
            name: '',
            email: '',
            title: '',
            phone: '',
        });
    }

    // Grid sizing conditions
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

    const [job, setJob] = useState([]);

    const handleJob = (event) => {
        const {
            target: { value },
        } = event;
        setJob(
            // On autofill we get the stringified value
            typeof value === 'string' ? value.split(',') : value
        );
        setJobPostingsObject({ ...jobPostingsObject, job_types: value });
    };

    const toAdminHub = () => {
        history.push('/adminhub');
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


    // job success alert
    return (
        <>
            <div className="form-container">
                <form className="add-job-form" onSubmit={handleSubmit}>
                    <Card xs={12}>
                        <Grid container item>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Your name" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField required
                                    type="text"
                                    id="poster-name"
                                    variant="standard"
                                    placeholder="name"
                                    className="poster-name"
                                    onChange={setValues('posting_contact_name')}
                                    value={jobPostingsObject.posting_contact_name} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Your email" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField required
                                    type="email"
                                    id="poster-email"
                                    variant="standard"
                                    placeholder="email"
                                    className="poster-email"
                                    onChange={setValues('posting_contact_email')}
                                    value={jobPostingsObject.posting_contact_email} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Company Name" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField required
                                    type="text"
                                    id="company"
                                    variant="standard"
                                    placeholder="company"
                                    className="company"
                                    onChange={setValues('company')}
                                    value={jobPostingsObject.company} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Title of Position Available" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField required
                                    type="text"
                                    placeholder="title"
                                    variant="standard"
                                    className="title"
                                    onChange={setValues('available_role')}
                                    value={jobPostingsObject.available_role} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Link to Job Post Online" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField required
                                    type="text"
                                    placeholder="link"
                                    variant="standard"
                                    className="application-link"
                                    onChange={setValues('application_link')}
                                    value={jobPostingsObject.application_link} ></TextField>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Select job types (Multiple selections allowed)" />
                                <div>
                                    <FormControl sx={{ m: 1.1, width: 300 }}>
                                        <InputLabel id="job-types">types</InputLabel>
                                        <Select
                                            labelId="job-types"
                                            id="job-types"
                                            multiple
                                            defaultValue={[]}
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
                            </Grid>

                            <Grid item xs={12} md={12} lg={12} xl={6}>
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
                                    value={jobPostingsObject.description} ></TextField>
                            </Grid>
                            <Grid item xs={6} md={4} lg={2} xl={2}>
                                <CardHeader title="City" />
                                &nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    placeholder="City"
                                    variant="standard"
                                    className="city"
                                    onChange={setValues('job_city')}
                                    value={jobPostingsObject.job_city} ></TextField>
                            </Grid>
                            <Grid item xs={6} md={4} lg={2} xl={2}>
                                <CardHeader title="State" />
                                &nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    placeholder="State"
                                    variant="standard"
                                    className="state"
                                    onChange={setValues('job_state')}
                                    value={jobPostingsObject.job_state} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="&nbsp;Is this job remote?" />
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        defaultChecked='false'
                                        aria-label="Is this job remote?"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel placeholder="remote-yes" value="yes" onClick={setValues('remote')} control={<Radio />} label="Yes" />
                                        <FormControlLabel placeholder="remote-no" value="no" onClick={setValues('remote')} control={<Radio />} label="No" />
                                        <FormControlLabel placeholder="remote-hybrid" value="hybrid" onClick={setValues('remote')} control={<Radio />} label="Hybrid" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="&nbsp;Can we share a contact person" />
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        defaultChecked='false'
                                        aria-label="Can we share a contact person?"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel placeholder="yes" value="yes" onClick={shareContact} control={<Radio />} label="Yes" />
                                        {toggleContact ? <p></p> : <div><TextField className="hiring-contact-name" variant="standard" placeholder="name" onChange={setValues('name')} ></TextField>&nbsp;&nbsp;
                                            &nbsp;<TextField className="hiring-contact-email" variant="standard" placeholder="email" onChange={setValues('email')} ></TextField>&nbsp;
                                            &nbsp;<TextField className="hiring-contact-title" variant="standard" placeholder="title" onChange={setValues('title')} ></TextField>&nbsp;
                                            &nbsp;&nbsp;<TextField className="hiring-contact-phone" variant="standard" placeholder="phone" onChange={setValues('phone')} ></TextField></div>}
                                        <FormControlLabel placeholder="no" value="no" onClick={handleDontShareContact} control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Card>
                    <input className="submit-add-job-button" type='submit' value='Submit' />
                </form>
                <Button onClick={toAdminHub}>Back to Hub</Button>
            </div>
            <Stack spacing={2} sx={{ width: '350px' }}>

                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} TransitionComponent={Slide}>

                    <Alert onClose={handleClose} severity="success" sx={{ width: '350px' }}>
                        Job Opening Added!
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
};

export default AdminAddJobPage;