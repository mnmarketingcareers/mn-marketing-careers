import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import { useHistory } from "react-router";
import './AdminAddJobPage.css';

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
    const [jobPostingsObject, setJobPostingsObject] = useState({
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

    // Two functions for the "Can we share a contact person?"
    const shareContact = (event) => {
        console.log('what is event', event.target.value)
        console.log('in yes')
        setJobPostingsObject({ ...jobPostingsObject, share_contact: true });
        changeContactView();
    };

    // Push new job inputs to the database to be seen on the DOM in a different component
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'NEW_EMPLOYER_JOB_POST',
            payload: jobPostingsObject
        })
        history.go(0);
        alert('New Job Submission Successful!');
    }

    const setValues = (propertyName) => (event) => {
        console.log('what is propertyName', propertyName);
        console.log('event.target.value is:', event.target.value);
        setJobPostingsObject({...jobPostingsObject, [propertyName]: event.target.value});
        setToggleOther(true);
    }

    const handleDontShareContact = (event) => {
        console.log('event.target.value', event.target.value);
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
        console.log('the event is:', event);
        console.log('the names are:', names);
        console.log('names[0].field', names[0].field);
        const {
            target: {value},
        } = event;
        setJob(
            // On autofill we get the stringified value
            typeof value === 'string' ? value.split(',') : value
        );
        setJobPostingsObject({...jobPostingsObject, job_types: value});
    };

    const toAdminHub = () => {
        history.push('/adminhub');
    }


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
                    <TextField
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
                    <TextField
                        type="text"
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
                    <TextField
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
                    <TextField
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
                    <TextField
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

                {/* <Button variant="contained" extended onClick={() => dispatch({ type: 'POST_APPROVED_JOBS'})}>Post approved jobs</Button> */}
            </div>
        </>
    );
};

export default AdminAddJobPage;