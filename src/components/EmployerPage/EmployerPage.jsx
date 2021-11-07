import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import './EmployerPage.css';

function EmployerPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(true);

    const [jobPostingsTable, setJobPostingsTable] = useState({ company: '', available_role: '', application_link: '', description: '', job_city: '', job_state: '', remote: '', share_contact: '' });

    const submitEmployerJob = (event) => {
        console.log('what is jobPostingsTable', jobPostingsTable)

    }

    const changeState = () => {
        setEditMode(!editMode)
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
                setEditMode(true);
                break;
            case 'other':
                setJobPostingsTable({ ...jobPostingsTable, remote: event.target.value })
                break;
            case 'test':
                setJobPostingsTable({ ...jobPostingsTable, share_contact: event.target.value })
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
                                    <FormControlLabel value="yes" onClick={setValues} control={<Radio />} label="yes" />
                                    <FormControlLabel value="no" onClick={setValues} control={<Radio />} label="no" />
                                    <FormControlLabel value="other" onClick={changeState} control={<Radio />} label="Other" />
                                    {editMode ? <p></p> : <p><input className="other" placeholder="details" onChange={setValues} ></input></p>}
                                </RadioGroup>
                            </FormControl>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader title="Can we share a contact person?" />
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="Can we share a contact person?"
                                    name="radio-buttons-group-contacts"
                                >
                                    <FormControlLabel inputprops={{ className: "test" }} value="yes" onClick={setValues} control={<Radio />} label="yes" />
                                    <FormControlLabel inputprops={{ className: "test" }} value="no" onClick={setValues} control={<Radio />} label="no" />
                                </RadioGroup>
                            </FormControl>
                        </Card>
                    </Grid>
                </Grid>


                <input className="submit-employer-form-button" type='submit' value='Submit' />
            </form>

        </>
    );
}

export default EmployerPage;