import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";
import "./UnsubFeedbackPage.css";


function UnsubFeedbackPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [reason, setReason] = useState({
    reason: "",
    message: "",
    status: "unsubscribed",
    subscriberHash: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch({
      type: "SUBMIT_UNSUB_FEEDBACK",
      payload: reason,
    });
    history.push("/main");
  };

  // switch statment function
  // select for a specified reason for unsubscribing and set that selected value to be submitted
  const radioButtonValue = (event) => {
    switch (event.target.value) {
      case "Found a Job Through MNMC!":
        setReason({ ...reason, reason: event.target.value });
      case "Found a Job Through Other Mediums":
        setReason({ ...reason, reason: event.target.value });
      case "Content Not Relevant To My Search":
        setReason({ ...reason, reason: event.target.value });
      case "I Did Not Sign Up to Receive These Emails":
        setReason({ ...reason, reason: event.target.value });
      default:
        return event;
    }
  };
  
  // function for text field
  // if a user selects "other" they can type their own reason for unsubscribing
  const textFieldValue = (event) => {
    setReason({ ...reason, message: event.target.value });
  };

  // if an unsubscriber selects the "other option"
  // we want to toggle from true to false for the ternerary operator
  const [toggleOther, setToggleOther] = useState(true);

  // this changeState function is called in the click action firing the "other" radio button
  const changeState = () => {
    setToggleOther(!toggleOther);
    setReason({ ...reason, reason: "other" });
  };



  // in this return I want a selection of reasons as radio/check buttons
  // conditional rendering to the DOM
  // if a job seeker selects other
  // there needs to be an other text field for comments
  // send results to database on click submit
  // navigate back to main page option needs to be available

  return (
    <>
      <div className="unsubheader">
        <h2>Unsubcribing? Let Us Know Why!</h2>
      </div>
      <form className="unsubfeedback" onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            style={{ textAlign: "center", paddingTop: "9px" }}
          >
            This information is valuable to us. We appreciate you taking the time to let us know why you'd like unsubscribe.
          </FormLabel>
          <RadioGroup aria-label="reason" name="radio-buttons-group">
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
          </RadioGroup>
          <TextField
            required
            label="Confirm Your Email to Unsubscribe"
            variant="outlined"
            type="email" 
            onChange={(event) => setReason({...reason, subscriberHash: event.target.value})}
          />
          <div className="unsub-submit-div">
            <input
              
              className="submit-employer-form-button"
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
        </FormControl>
      </form>
    </>
  );
}

export default UnsubFeedbackPage;
