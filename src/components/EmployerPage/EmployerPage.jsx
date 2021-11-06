import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './EmployerPage.css';

function EmployerPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [company, setCompany] = useState({ company: ''});
    const [jobPostingsTable, setJobPostingsTable] = useState({ available_role: '', application_link: '', description: '', job_city: '', job_state: '',});

    const submitEmployerJob = (event) => {

    }

    const setValues = (event) => {
        console.log('what is event.target.className', event.target.className);
        console.log('what is event.target.value', event.target.value);
        switch (event.target.className) {
            case 'company':
                setCompany({ ...company, company: event.target.value })
                break;
            case 'title':
                setJobPostingsTable({... jobPostingsTable, available_role: event.target.value})
                break;
            case 'application-link':
                setJobPostingsTable({... jobPostingsTable, application_link: event.target.value})
                break;
                case 'description':
                setJobPostingsTable({... jobPostingsTable, description: event.target.value})
                break;

                case 'city':
                setJobPostingsTable({... jobPostingsTable, job_city: event.target.value})
                break;
                case 'state':
                setJobPostingsTable({... jobPostingsTable, job_state: event.target.value})
                break;
        }
    }

    return (
        <>
            <form className="employer-form" onSubmit={submitEmployerJob}>
                <input type="text" placeholder="company" className="company" onChange={setValues} value={company.company} ></input>
                <input type="text" placeholder="Title" className="title" onChange={setValues} value={jobPostingsTable.available_role} ></input>
                <input type="text" placeholder="Link" className="application-link" onChange={setValues} value={jobPostingsTable.application_link} ></input>
                <input type="text" placeholder="Description" className="description" onChange={setValues} value={jobPostingsTable.description} ></input>
                <input type="text" placeholder="City" className="city" onChange={setValues} value={jobPostingsTable.job_city} ></input>
                <input type="text" placeholder="State" maxLength="2" className="state" onChange={setValues} value={jobPostingsTable.job_state} ></input>
                

                <input className="submit-employer-form-button" type='submit' value='Submit' />
            </form>

        </>
    );
}

export default EmployerPage;