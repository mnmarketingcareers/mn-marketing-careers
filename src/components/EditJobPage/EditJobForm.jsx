import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

// mui imports
import {  
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
    CardHeader,
    Typography,
} from '@mui/material';

// Snackbar button
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
    
function EditJobForm ({ thisJob, jobTypes }) {

    // declare hooks
    const dispatch = useDispatch();
    const history = useHistory();
    
    
    const [rowEdits, setRowEdits] = useState(thisJob);


    // for readable display of share contact data
    const stringifyShareContact = (str) => {
        if (str === true) {
                return 'yes';
            } else {
                return 'no';
            }
    }
    // calling function do set to variable with actual data from DB
    const editShareContact = stringifyShareContact(thisJob.share_contact);



    // Update object to send to DB for editing
    const setValues = (propertyName) => (event) => {
        setRowEdits({...rowEdits, [propertyName]: event.target.value});
        setToggleOther(true);
    }

    // On form submission, send updated object to the server, via dispatch to Saga
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'EDIT_JOB_POSTING',
            payload: rowEdits
        })
        setOpen(true); setTimeout(() => {
            history.push('/adminjoblist')
         }, 2000);
    }
    
    // Success Button toggle
    const [open, setOpen] = useState(false);
        
    // For the Snackbar button when Submit is pressed.
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // For the Snackbar button when Submit is pressed.
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    // "Is this job remote?": toggles whether other other input field is displayed or not. 
    const [toggleOther, setToggleOther] = useState(true);
    

    // "Can we share contact person?"; toggles the input fields necessary to add person's contact info.
    const [toggleContact, setToggleContact] = useState(true);
 
    // If allowed to share a contact, we can toggle to text fields to input that info
    const changeContactView = () => {
         setToggleContact(!toggleContact);
     };

    // Two functions for the "Can we share a contact person?"
    // Handling 'yes' radio button
    const shareContact = (event) => {
        setRowEdits({ ...rowEdits, share_contact: true });
        changeContactView();
    };

    // handling 'no' radio button
    const handleDontShareContact = () => {
        setRowEdits({
            ...rowEdits, share_contact: false,
            hiring_contact_name: '',
            hiring_contact_email: '',
            title: '',
            phone: '',
        });
    }

    // populate array of job types from multiselect
    const [job, setJob] = useState([]);

    const handleJob = (event) => {
        const {
            target: {value},
        } = event;
        setJob(
            // On autofill we get the stringified value
            typeof value === 'string' ? value.split(',') : value
        );

        setRowEdits({...rowEdits, job_type: value });

    };

    //page-specific styling
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

    return (
        <>
            <Typography>Title: {thisJob.available_role}, Company: {thisJob.company_name}</Typography>
            <FormControl>

                <form className="add-job-form" onSubmit={handleSubmit}>

                    <Card xs={12}>
                        <Grid container item>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Contact person" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    id="poster-name"
                                    variant="standard"
                                    defaultValue={thisJob.posting_contact_name}
                                    placeholder={thisJob.posting_contact_name}
                                    className="poster-name"
                                    onChange={setValues('posting_contact_name')}
                                    value={rowEdits.posting_contact_name} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Contact email" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="email"
                                    id="poster-email"
                                    variant="standard"
                                    defaultValue={thisJob.posting_contact_email}
                                    placeholder={thisJob.posting_contact_email}
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
                                    defaultValue={thisJob.company_name}
                                    placeholder={thisJob.company_name}
                                    className="company"
                                    onChange={setValues('company_name')}
                                    value={rowEdits.company_name} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Title of Position Available" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    defaultValue={thisJob.available_role}
                                    placeholder={thisJob.available_role}
                                    variant="standard"
                                    className="title"
                                    onChange={setValues('available_role')}
                                    value={rowEdits.available_role} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Link to application page" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    type="text"
                                    defaultValue={thisJob.application_link}
                                    placeholder={thisJob.application_link}
                                    variant="standard"
                                    className="application-link"
                                    onChange={setValues('application_link')}
                                    value={rowEdits.application_link} ></TextField>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="Select job types (Multiple selections allowed)" />
                                <p>Editing: {thisJob.job_type}</p>
                                <div>
                                    <FormControl sx={{ m: 1.1, width: 300 }}>
                                        <InputLabel id="job-types"></InputLabel>
                                        <Select
                                            labelId="job-types"
                                            id="job-types"
                                            defaultValue={''}
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
                                    defaultValue="no description"
                                    placeholder={thisJob.description}
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
                                    defaultValue={thisJob.job_city}
                                    placeholder={thisJob.job_city}
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
                                    defaultValue={thisJob.job_state}
                                    placeholder={thisJob.job_state}
                                    variant="standard"
                                    className="state"
                                    onChange={setValues('job_state')}
                                    value={rowEdits.job_state} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                                <CardHeader title="&nbsp;Is this job remote?" />
                                <p>Editing: {thisJob.remote}</p>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        defaultChecked={thisJob.remote}
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
                                <p>Editing: {editShareContact}</p>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        defaultChecked={thisJob.share_contact}
                                        aria-label="Can we share a contact person?"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="yes" onClick={shareContact} control={<Radio />} label="Yes" />
                                        {toggleContact ?
                                            <p></p>
                                            :
                                            <div>
                                                <p>
                                                    {thisJob.hiring_contact_name}
                                                    {thisJob.hiring_contact_email}
                                                    {thisJob.title}
                                                    {thisJob.phone}
                                                </p>
                                                <TextField className="hiring-contact-name" variant="standard" placeholder="name" onChange={setValues('hiring_contact_name')} ></TextField>&nbsp;&nbsp;
                                                &nbsp;<TextField className="hiring-contact-email" variant="standard" placeholder="email" onChange={setValues('hiring_contact_email')} ></TextField>&nbsp;
                                                &nbsp;<TextField className="hiring-contact-title" variant="standard" placeholder="title" onChange={setValues('title')} ></TextField>&nbsp;
                                                &nbsp;&nbsp;<TextField className="hiring-contact-phone" variant="standard" placeholder="phone" onChange={setValues('phone')} ></TextField>
                                            </div>
                                        }
                                        <FormControlLabel value="no" onClick={handleDontShareContact} control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Card>
                    <input className="submit-add-job-button" type='submit' value='Submit' />

                </form>
                
            </FormControl>
            <Stack spacing={2} sx={{ width: '350px' }}>
                <Snackbar open={open} autoHideDuration={1800} onClose={handleClose} TransitionComponent={Slide}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '350px' }}>
                        Submitting Edits
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    )
}

export default EditJobForm;