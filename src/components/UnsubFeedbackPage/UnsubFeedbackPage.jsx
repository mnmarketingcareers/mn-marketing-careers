import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import './UnsubFeedbackPage.css';
import FormGroup from '@mui/material/FormGroup';
import axios from 'axios';
import { Feedback } from '@mui/icons-material';

function UnsubFeedbackPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    // object useState? 
    const [reason, setReason] = useState({
        reason: '',
        message: ''
    });
    const [message, setMessage] = useState('');

    //const feedback = useSelector(store => store.feedback);     
        
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);

        dispatch({
            type: 'SUBMIT_FEEDBACK',
            payload: {
                reason: reason,
                message: message
            }
        })
    }

    // switch statment function?
    const radioButtonValue = (event) => {
        console.log('inside radio button', event.target.value);
        switch(event.target.value) {
            case 'Found a Job Through MNMC!':
                setReason({...reason, reason: event.target.value});
            case 'Found a Job Through Other Mediums':
                setReason({...reason, reason: event.target.value});
            case 'Content Not Relevant To My Search':
                setReason({...reason, reason: event.target.value});
            case 'I Did Not Sign Up to Receive These Emails':
                setReason({...reason, reason: event.target.value});
            default:
                return event;
        }
    }
    // function for text field

    const textFieldValue = (event) => {
        console.log('inside text field', event.target.value);
        setMessage({...reason, message: event.target.value})
    }

    // if an unsubscriber selects the "other option" 
    // we want to toggle from true to false for the ternerary operator
    const [toggleOther, setToggleOther] = useState(true);

    // this changeState function is called in the click action firing the "other" radio button
    const changeState = () => {
        setToggleOther(!toggleOther);
    }


    // in this return I want a selection of reasons as radio/check buttons
    // conditional rendering to the DOM
    // if a job seeker selects other 
    // there needs to be an other text field for comments
    // send results to database on click submit
    // navigate back to main page option needs to be available

    //fix margins for form, center on page or just increase margins on left side
    //fix added select radio button to other field, on click, show text field

    return (
        <>
        <div className="unsubheader">
            <h2>Unsubcribing? Let Us Know Why!</h2>
        </div>
        <div className="unsubfeedback">
            <FormControl component="fieldset">
            <FormLabel component="legend">Select a Reason</FormLabel>
            <RadioGroup
                aria-label="reason"
                name="radio-buttons-group"
            >
                <FormControlLabel 
                value="Found a Job Through MNMC!" 
                control={<Radio />} 
                label="Found a Job Through MNMC!"
                onClick={radioButtonValue} 
                />
                <FormControlLabel 
                value="Found a Job Through Other Mediums" 
                control={<Radio />} 
                label="Found a Job Through Other Mediums"
                onClick={radioButtonValue} 
                />
                <FormControlLabel 
                value="Content Not Relevant To My Search" 
                control={<Radio />} 
                label="Content Not Relevant To My Search" 
                onClick={radioButtonValue}
                />
                <FormControlLabel 
                value="I Did Not Sign Up to Receive These Emails" 
                control={<Radio />} 
                label="I Did Not Sign Up to Receive These Emails" 
                onClick={radioButtonValue}/>
                <FormControlLabel value="other" onClick={changeState} control={<Radio />} label="Other" />
                {toggleOther ? <p></p> : <div><TextField 
                id="standard-basic" 
                label="Other" 
                variant="standard" 
                onChange={textFieldValue}/></div>}
            </RadioGroup>
            <input onClick={handleSubmit} className="btn" type="submit" name="submit" value="submit feedback" />
            </FormControl>
        </div>
        </>
        
    )
}

export default UnsubFeedbackPage;