import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import './EditJobPage.css';

// mui imports
import { 
    Button, 
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
    CardHeader
} from '@mui/material';

function EditJobPage() {
    // declare hooks
    const history = useHistory();
    const dispatch =useDispatch();
    const { id } = useParams();
    const jobToEdit = useSelector(store => store.setJobsReducer);
    const jobTypes = useSelector(store => store.jobTypes);


    // make call for item to edit on page load with useEffect
    useEffect( ()=> {
        dispatch({ type: 'GET_JOB_TYPES' });
        dispatch({ type: 'FETCH_JOB_ID', payload: { job_posting_id: id } });
    }, []);
    // set items in state 
    const [rowEdits, setRowEdits] = useState(jobToEdit);

    // declare anonymous functions
     // "Is this job remote?": toggles whether other other input field is displayed or not. 
     const [toggleOther, setToggleOther] = useState(true);

     // "Can we share contact person?"; toggles the input fields necessary to add person's contact info.
     const [toggleContact, setToggleContact] = useState(true);
 
     // If allowed to share a contact, we can toggle to text fields to input that info
     const changeContactView = () => {
         setToggleContact(!toggleContact);
     };

     // Two functions for the "Can we share a contact person?"
    const shareContact = (event) => {
        console.log('in yes')
        setRowEdits({ ...rowEdits, share_contact: true });
        changeContactView();
    };

    // Push new job inputs to the database to be seen on the DOM in a different component
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_APPROVED_JOB_POST',
            payload: rowEdits
        })
        history.go(0);
        alert('New Job Submission Successful!');
    }

    const setValues = (propertyName) => (event) => {
        console.log('what is propertyName', propertyName);
        console.log('event.target.value is:', event.target.value);
        setRowEdits({...rowEdits, [propertyName]: event.target.value});
        setToggleOther(true);
    }

    const handleDontShareContact = () => {
        setRowEdits({
            ...rowEdits, share_contact: false,
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

    const [job, setJob] = useState([]);

    const handleJob = (event) => {
        const {
            target: {value},
        } = event;
        setJob(
            // On autofill we get the stringified value
            typeof value === 'string' ? value.split(',') : value
        );
        setRowEdits({...rowEdits, job_types: value});
    };

    const toAdminHub = () => {
        history.push('/adminhub');
    }

    // set return
    return(
        <div>
            <h2>Edit this posting:</h2>
            <p>{JSON.stringify(jobToEdit)}</p>
            <p>{JSON.stringify(jobTypes)}</p>
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
                        placeholder={jobToEdit.posting_contact_name}
                        className="poster-name"
                        onChange={setValues('posting_contact_name')}
                        value={rowEdits.posting_contact_name} ></TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <CardHeader title="Your email" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                        type="text"
                        id="poster-email"
                        variant="standard"
                        placeholder={jobToEdit.posting_contact_email}
                        className="poster-email"
                        onChange={setValues('posting_contact_email')}
                        value={rowEdits.posting_contact_email} ></TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <CardHeader title="Company Name" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                        type="text"
                        id="company"
                        variant="standard"
                        placeholder={jobToEdit.company_name}
                        className="company"
                        onChange={setValues('company')}
                        value={rowEdits.company_name} ></TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <CardHeader title="Title of Position Available" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                        type="text"
                        placeholder={jobToEdit.available_role}
                        variant="standard"
                        className="title"
                        onChange={setValues('available_role')}
                        value={rowEdits.available_role} ></TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <CardHeader title="Link to Job Post Online" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                        type="text"
                        placeholder={jobToEdit.application_link}
                        variant="standard"
                        className="application-link"
                        onChange={setValues('application_link')}
                        value={rowEdits.application_link} ></TextField>
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
                                {jobTypes.map((name) => (
                                    <MenuItem key={name.id} id={name.type} value={name.type}>
                                        <Checkbox checked={job.indexOf(name.type) > -1} />
                                        <ListItemText primary={name.type} />
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
                        placeholder={jobToEdit.description}
                        variant='outlined'
                        className="description"
                        onChange={setValues('description')}
                        value={rowEdits.description} ></TextField>
                </Grid>
                <Grid item xs={6} md={4} lg={2} xl={2}>
                    <CardHeader title="City" />
                    &nbsp;&nbsp;&nbsp;
                    <TextField
                        type="text"
                        placeholder={jobToEdit.job_city}
                        variant="standard"
                        className="city"
                        onChange={setValues('job_city')}
                        value={rowEdits.job_city} ></TextField>
                </Grid>
                <Grid item xs={6} md={4} lg={2} xl={2}>
                    <CardHeader title="State" />
                    &nbsp;&nbsp;&nbsp;
                    <TextField
                        type="text"
                        placeholder={jobToEdit.job_state}
                        variant="standard"
                        className="state"
                        onChange={setValues('job_state')}
                        value={rowEdits.job_state} ></TextField>
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
        </div>
    )
}

export default EditJobPage;