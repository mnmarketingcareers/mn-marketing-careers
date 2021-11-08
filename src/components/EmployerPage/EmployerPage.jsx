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

 

    const setValues = (event) => {
        console.log('what is event.target.className', event.target.className);
        console.log('what is event.target.value', event.target.value);
        switch (event.target.className) {
            case 'company':
                setJobPostingsTable({ ...jobPostingsTable, company: event.target.value })
                break;
            case 'title':
                setJobPostingsTable({ ...jobPostingsTable, available_role: event.target.value })
                break;
            case 'application-link':
                setJobPostingsTable({ ...jobPostingsTable, application_link: event.target.value })
                break;
            case 'description':
                setJobPostingsTable({ ...jobPostingsTable, description: event.target.value })
                break;
            case 'city':
                setJobPostingsTable({ ...jobPostingsTable, job_city: event.target.value })
                break;
            case 'state':
                setJobPostingsTable({ ...jobPostingsTable, job_state: event.target.value })
                break;
            case 'PrivateSwitchBase-input css-1m9pwf3':
                setJobPostingsTable({ ...jobPostingsTable, remote: event.target.value })
                setToggleOther(true);
                break;
            case 'other':
                setJobPostingsTable({ ...jobPostingsTable, remote: event.target.value })
                break;
            case 'hiring-contact-name':
                setJobPostingsTable({ ...jobPostingsTable, name: event.target.value })
                break;
            case 'hiring-contact-email':
                setJobPostingsTable({ ...jobPostingsTable, email: event.target.value })
                break;
            case 'hiring-contact-title':
                setJobPostingsTable({ ...jobPostingsTable, title: event.target.value })
                break;
            case 'hiring-contact-phone':
                setJobPostingsTable({ ...jobPostingsTable, phone: event.target.value })
                break;
        }
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
                            <input
                                type="text"
                                id="company"
                                placeholder="company"
                                className="company"
                                onChange={setValues}
                                value={jobPostingsTable.company} ></input>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Title of Position Available" />
                            <input
                                type="text"
                                placeholder="Title"
                                className="title"
                                onChange={setValues}
                                value={jobPostingsTable.available_role} ></input>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Link to Job Post Online" />
                            <input
                                type="text"
                                placeholder="Link"
                                className="application-link"
                                onChange={setValues}
                                value={jobPostingsTable.application_link} ></input>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Description" />
                            <input
                                type="text"
                                placeholder="Description"
                                className="description"
                                onChange={setValues}
                                value={jobPostingsTable.description} ></input>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="City" />
                            <input
                                type="text"
                                placeholder="City"
                                className="city"
                                onChange={setValues}
                                value={jobPostingsTable.job_city} ></input>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="State" />
                            <input
                                type="text"
                                placeholder="State"
                                maxLength="2"
                                className="state"
                                onChange={setValues}
                                value={jobPostingsTable.job_state} ></input>
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
                                    <FormControlLabel placeholder="remote-yes" value="yes" onClick={setValues} control={<Radio />} label="yes" />
                                    <FormControlLabel placeholder="remote-no" value="no" onClick={setValues} control={<Radio />} label="no" />
                                    <FormControlLabel value="other" onClick={changeState} control={<Radio />} label="Other" />
                                    {toggleOther ? <p></p> : <p><input className="other" placeholder="details" onChange={setValues} ></input></p>}
                                </RadioGroup>
                            </FormControl>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Can we share a contact person?" />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} name="yes" onClick={checkBoxValue} label="yes"/>
                                    {toggleContact ? <p></p> : <p><input className="hiring-contact-name" placeholder="name" onChange={setValues} ></input>
                                                                <input className="hiring-contact-email" placeholder="email" onChange={setValues} ></input>
                                                                <input className="hiring-contact-title" placeholder="title" onChange={setValues} ></input>
                                                                <input className="hiring-contact-phone" placeholder="phone" onChange={setValues} ></input></p>}
                                    <FormControlLabel control={<Checkbox />} name="no" onClick={checkBoxValue} label="no"/>
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