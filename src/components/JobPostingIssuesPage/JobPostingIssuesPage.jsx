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
import FormGroup from "@mui/material/FormGroup";
import axios from "axios";
import JobIssuesItem from "./JobIssuesItem";

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

    // TODO incorporate useParams?
    // handle main page job issue trigger (useffect to trigger it?)
    // post route handle submit?
    // TODO append that position on DOM as a header?
    // MUI radio button options underneath
    // New saga to the server
    // New router
    // ON THIS PAGE
    // One GET: job postings page
    // One POST: issues page
    // TODO ON THE NEW ROUTER
    // One PUT: changed is_resolved to 'true'/toggle to 'not' like in feedback router
    // One DELETE: maybe... (stretch)
    // Main page will need a history.push('/jobpostingissue/${whateverId}') 

    // TODO figuring out the correct payload for the post is tricky
    // issue_type vs a comment?
    // who's email are we adding, the person who raised the issue?
    
    
    // get by ID route in job postings router
    const job = useSelector(store => store.setJobsReducer);

    console.log('whats in setJobsReducer in job issue page', job);
    

    //will I need a new saga/reducer for this dispatch? POST route?
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('the event is', event);
        dispatch({
            type: 'ADD_JOB_ISSUE',
            payload: issue, jobId
        });
        alert('Thank you for your feedback!');
        //history.push('/main');
  };

    // useEffect to trigger dispatches to fetch jobs on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_MAIN_JOBS', payload: { id: jobId } }); 
    }, [])

  // switch statment function for different radio button selection options
  const radioButtonValue = (event) => {
    console.log('inside radio button', event.target.value);
    switch (event.target.value) {
      case 'This Position is No Longer Available':
        setIssue({ ...issue, issue_type: event.target.value });
      case 'Issue With the Job Listing Website':
        setIssue({ ...issue, issue_type: event.target.value });
      case 'Content Not Relevant To My Search':
        setIssue({ ...issue, issue_type: event.target.value });
      default:
        return event;
    }
  };
  // function for text field

  const textFieldValue = (event) => {
    console.log('inside text field', event.target.value);
    setIssue({ ...issue, comment: event.target.value });
  };

  const emailTextFieldValue = (event) => {
    console.log('inside email text field', event.target.value);
    setIssue({...issue, issues_email: event.target.value});
  }

  // if an unsubscriber selects the "other option"
  // we want to toggle from true to false for the ternerary operator
  const [toggleOther, setToggleOther] = useState(true);

  // this changeState function is called in the click action firing the "other" radio button
  const changeState = () => {
    setToggleOther(!toggleOther);
    setIssue({ ...issue, issue_type: 'other' });
  };

  // I may need to map through jobs to get this to appear on the dom, child component and props might be needed
    return (
        <>
      <div className="issueheader">
        <h2>Hit a Snag Applying? Let Us Know What's Going On</h2>
      </div>
      <div className="jobinquestion">
        {job.map((jobIssue) => {
            return(<JobIssuesItem key={jobIssue.id} jobIssue={jobIssue}/>)
        })}
      </div>
      <div className="issueform">
        <FormControl component="fieldset">
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
                  id="standard-basic"
                  label="Please Confirm Your Email"
                  variant="standard"
                  onChange={emailTextFieldValue}
                />
          </RadioGroup>
          <div className="unsub-submit-div">
            <input
              onClick={handleSubmit}
              className="submit-employer-form-button"
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
        </FormControl>
      </div>
    </>
    );
};

export default JobPostingIssuesPage;