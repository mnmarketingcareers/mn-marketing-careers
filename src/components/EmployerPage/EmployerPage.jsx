import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';

import './EmployerPage.css';

function EmployerPage() {

    const history = useHistory();
    const dispatch = useDispatch();

// On the question : "Is this job remote?"; toggles wether other input field is displayed or not.
    const [toggleOther, setToggleOther] = useState(true);

    const changeState = () => {
        setToggleOther(!toggleOther)
    }

// On the question: "Can we share contact person?"; toggles the input fields necessary to add person's contact info.
    const [toggleContact, setToggleContact] = useState(true);

    const changeContactView = () => {
        setToggleContact(!toggleContact)
    }

// Data to be dispatched to job_postings, hiring_contact, and company tables in mn_marketing_careers database.
    const [jobPostingsTable, setJobPostingsTable] = useState({ company: '', 
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
                                                            phone: '' });

    const submitEmployerJob = (event) => {
        console.log('what is jobPostingsTable', jobPostingsTable)
        dispatch({
            type: 'NEW_EMPLOYER_JOB_POST',
            payload: jobPostingsTable
        })

    }

 

    const setValues = (propertyName) => (event) => {
        console.log('what is propertyName', propertyName);
        console.log('what is event.target.value', event.target.value);
        setJobPostingsTable({ ...jobPostingsTable, [propertyName]: event.target.value })
    };

    const checkBoxValue = (event) => {
        console.log('in checkbox: event.target.value', event.target.name)
        console.log('in checkbox: event.target.checked', event.target.checked)
        switch (event.target.name){
            case 'yes':
                setJobPostingsTable({...jobPostingsTable, share_contact: true})
                changeContactView();
                break;
            case 'no':
                setJobPostingsTable({...jobPostingsTable, share_contact: false})
                break;

        }
    }

    return (
        <>
            <form className="employer-form" onSubmit={submitEmployerJob}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Company Name" />
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
                            <TextField
                                type="text"
                                placeholder="Title"
                                variant="standard"
                                className="title"
                                onChange={setValues('available_role')}
                                value={jobPostingsTable.available_role} ></TextField>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Link to Job Post Online" />
                            <TextField
                                type="text"
                                placeholder="Link"
                                variant="standard"
                                className="application-link"
                                onChange={setValues('application_link')}
                                value={jobPostingsTable.application_link} ></TextField>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Description" />
                            <TextField
                                type="text"
                                placeholder="Description"
                                variant="standard"
                                className="description"
                                onChange={setValues('description')}
                                value={jobPostingsTable.description} ></TextField>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="City" />
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
                            <TextField
                                type="text"
                                placeholder="State"
                                variant="standard"
                                maxLength="2"
                                className="state"
                                onChange={setValues('job_state')}
                                value={jobPostingsTable.job_state} ></TextField>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Is this job remote?" />
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="Is this job remote?"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel placeholder="remote-yes" value="yes" onClick={setValues('remote')} control={<Radio />} label="Yes" />
                                    <FormControlLabel placeholder="remote-no" value="no" onClick={setValues('remote')} control={<Radio />} label="No" />
                                    <FormControlLabel value="other" onClick={changeState} control={<Radio />} label="Other" />
                                    {toggleOther ? <p></p> : <p><input className="other" placeholder="details" onChange={setValues('remote')} ></input></p>}
                                </RadioGroup>
                            </FormControl>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Can we share a contact person?" />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} name="yes" onClick={checkBoxValue} label="Yes"/>
                                    {toggleContact ? <p></p> : <p><input className="hiring-contact-name" placeholder="name" onChange={setValues('name')} ></input>
                                                                <input className="hiring-contact-email" placeholder="email" onChange={setValues('email')} ></input>
                                                                <input className="hiring-contact-title" placeholder="title" onChange={setValues('title')} ></input>
                                                                <input className="hiring-contact-phone" placeholder="phone" onChange={setValues('phone')} ></input></p>}
                                    <FormControlLabel control={<Checkbox />} name="no" onClick={checkBoxValue} label="No"/>
                                </FormGroup>                           
                        </Card>
                    </Grid>
                </Grid>


                <input className="submit-employer-form-button" type='submit' value='Submit' />
            </form>

        </>
    );
}

export default EmployerPage;