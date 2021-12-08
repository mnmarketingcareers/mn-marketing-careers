import React from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";


import ReCaptchaV2 from 'react-google-recaptcha';
import './JobPostingIssuePage.css'

function JobPostingIssuesPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const allParams = useParams();
    const jobId = allParams.id;

    const [issue, setIssue] = useState({
        job_posting_id: jobId,
        comment: '',
        issue_type: '',
        is_resolved: 'FALSE',
        issues_email: ''
    })   
    
    // get by ID route in job postings router
    const job = useSelector(store => store.setJobsReducer);

    const thisJob = job[0];

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_JOB_ISSUE',
            payload: issue
        });
        alert('Thank you for your feedback!');
        history.push('/main');
  };

    // useEffect to trigger dispatches to fetch jobs on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_MAIN_JOBS', payload: { id: jobId } }); 
    }, [])

  // switch statment function for different radio button selection options
  const radioButtonValue = (event) => {
    switch (event.target.value) {
      case 'This Position is No Longer Available':
        setIssue({ ...issue, issue_type: event.target.value });
      case 'Issue With the Job Listing Website':
        setIssue({ ...issue, issue_type: event.target.value });
      case 'Information on Job Posting Is Not Accurate':
        setIssue({ ...issue, issue_type: event.target.value });
      default:
        return event;
    }
  };
  // function for text field

  const textFieldValue = (event) => {
    setIssue({ ...issue, comment: event.target.value });
  };

  const emailTextFieldValue = (event) => {
    setIssue({...issue, issues_email: event.target.value});
  }

  // if an unsubscriber selects the "other option"
  // we want to toggle from true to false for the ternerary operator
  const [toggleOther, setToggleOther] = useState(true);
  const [showButton, setShowButton] = useState(false);
  
  /**
   * Adds the token to the form object
   *
   * @param {string} token - response from ReCaptcha
   */
  const handleToken = (token) => {
    setShowButton(true);
    setIssue((issue) => {
      return { ...issue, token }
    });
  }

  /**
   * Removes the token from the from object
   */
  const handleExpire = () => {
    dispatch({ type: 'RESET_LASAGNA' });
    setShowButton(false);
    setIssue((issue) => {
      return { ...issue, token: null }
    });
  }

  // this changeState function is called in the click action firing the "other" radio button
  const changeState = () => {
    setToggleOther(!toggleOther);
    setIssue({ ...issue, issue_type: 'other' });
  };

  const goBack = () => {
    history.push('/main')
  }

    return (
        <>
      <div className="job-issue-container">
      <div className="issueheader">
        <h2>Hit a Snag Applying? Let Us Know What's Going On</h2>
      </div>
      <div className="jobinquestion">
        <h3>Position in Question: {thisJob.available_role}</h3>
      </div>
      <div className="issueform">
        <form onSubmit={handleSubmit}>
        <FormControl required component="fieldset">
          <FormLabel
            component="legend"
            style={{ textAlign: "center", paddingTop: "9px" }}
          >
            This information is valuable to us. We appreciate you taking the time to let us know what's wrong with this job posting.
          </FormLabel>
          <RadioGroup aria-label="reason" name="radio-buttons-group">
            <FormControlLabel
              value="Information on Job Posting Is Not Accurate"
              control={<Radio />}
              label="Information on Job Posting Is Not Accurate"
              onClick={radioButtonValue}
            />  
            <FormControlLabel
              value="This Position is No Longer Available"
              control={<Radio />}
              label="This Position is No Longer Available"
              onClick={radioButtonValue}
            />
            <FormControlLabel
              value="Issue With the Job Listing Website"
              control={<Radio />}
              label="Issue With the Job Listing Website"
              onClick={radioButtonValue}
            />
            <FormControlLabel
              value="other"
              onClick={changeState}
              control={<Radio />}
              label="Other"
            />
            {toggleOther ? (
              <p></p>
            ) : (
              <div>
                <TextField
                  id="standard-basic"
                  label="Other"
                  variant="standard"
                  onChange={textFieldValue}
                />
              </div>
            )}
            <TextField
              required
              type="email"
              id="standard-basic"
              label="Please Confirm Your Email"
              variant="standard"
              onChange={emailTextFieldValue}
            />
          </RadioGroup>
          <div className="recaptcha-container">
            {
              !showButton &&     
            <ReCaptchaV2 sitekey={(process.env.REACT_APP_RECAPTCHA_SITE_KEY)} 
              onChange={handleToken}
              onExpired={handleExpire}
              onErrored={err => console.error(`Recaptcha error: ${err}`)}
            />
            }
            {
              showButton &&
              <input className="submit-issues-form-button" type='submit' value='Submit' />
            }
            <button className="cancel-employer-form-button" onClick={goBack}>Cancel</button>
          </div>
        </FormControl>
        </form>
      </div>
      </div>
    </>

    );
};

export default JobPostingIssuesPage;