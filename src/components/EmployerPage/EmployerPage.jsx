import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import './EmployerPage.css';

function EmployerPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [jobPostingsTable, setJobPostingsTable] = useState({ company: '', available_role: '', application_link: '', description: '', job_city: '', job_state: '', remote: '' });

    const submitEmployerJob = (event) => {
        console.log('what is jobPostingsTable', jobPostingsTable)

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
                break;
        }
    }

    return (
        <>
            <form className="employer-form" onSubmit={submitEmployerJob}>
                <input
                    type="text"
                    placeholder="company"
                    className="company"
                    onChange={setValues}
                    value={jobPostingsTable.company} ></input>
                <input
                    type="text"
                    placeholder="Title"
                    className="title"
                    onChange={setValues}
                    value={jobPostingsTable.available_role} ></input>
                <input
                    type="text"
                    placeholder="Link"
                    className="application-link"
                    onChange={setValues}
                    value={jobPostingsTable.application_link} ></input>
                <input
                    type="text"
                    placeholder="Description"
                    className="description"
                    onChange={setValues}
                    value={jobPostingsTable.description} ></input>
                <input
                    type="text"
                    placeholder="City"
                    className="city"
                    onChange={setValues}
                    value={jobPostingsTable.job_city} ></input>
                <input
                    type="text"
                    placeholder="State"
                    maxLength="2"
                    className="state"
                    onChange={setValues}
                    value={jobPostingsTable.job_state} ></input>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Is this job remote?</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        defaultValue="other"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="yes" onClick={setValues} control={<Radio />} label="yes" />
                        <FormControlLabel value="no" onClick={setValues} control={<Radio />} label="no" />
                        <FormControlLabel value="other" onClick={setValues} control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>


                <input className="submit-employer-form-button" type='submit' value='Submit' />
            </form>

        </>
    );
}

export default EmployerPage;