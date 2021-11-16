import React, { useState, useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import useStyles from "../Styles/Styles";

function UserPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const subs = useSelector((store) => store.setSubsListReducer); //incoming full subs list
  const [subList, setSubList] = useState([]); //to set state of subs

  //states for fields
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignPreviewText, setCampaignPreviewText] = useState("");
  const [campaignBodyText, setCampaignBodyText] = useState("");
  const [footerChecked, setFooterChecked] = useState(true); //state of "use footer?" checkbox
  const [emailArray, setEmailArray] = useState([]);

  useEffect(() => {
    dispatch({ type: "GET_SUBS" });
    setSubList(subs.data);
    console.log("subList is:", subList);
  }, []);

  const toggleCheckBox = (event) => {
    setFooterChecked(event.target.checked); //toggle to opposite on click checkbox
    console.log("Include pre-built footer?", event.target.checked);
  };

  const handleCreateEmail = () => {
    setEmailArray([])
    for (let email of subs[0]) {
      // emailArray.push({name: email.full_name, mail: email.email_address});
      emailArray.push(email.email_address); //deletelater ???

    }
    console.log("subs email array:", emailArray);
    console.log("Number of recipients:", emailArray.length);

    console.log("Title:", campaignTitle);
    console.log("Subject:", campaignSubject);
    console.log("Preview Text:", campaignPreviewText);
    console.log("Body:", campaignBodyText);
    console.log("Footer?:", footerChecked);
    console.log("Recipients?:", subs[0]);

    dispatch({
      type: "CREATE_CAMPAIGN",
      payload: {
        title: campaignTitle,
        subject: campaignSubject,
        previewText: campaignPreviewText,
        body: campaignBodyText,
        footer: footerChecked,
        recipients: subs[0],
      },
    });
  };

  const clearInputs = () => {
    setCampaignTitle("");
    setCampaignSubject("");
    setCampaignPreviewText("");
    setCampaignBodyText("");
  };

  return (
    <div className="container">
      <br />
      <Typography style={{ textAlign: "center" }} variant="h3">
        New Email Campaign
      </Typography>
      <Typography
        style={{ textAlign: "center", marginBottom: "25px" }}
        variant="h6"
      >
        This email will be sent to <u>{emailArray.length}</u> recipients
      </Typography>
      <Paper className={classes.userPagePaperContainer} elevation={6}>
        <Typography variant="h6">
          Follow the fields and prompts below to create and send a new email
          campaign.
        </Typography>
        <form onSubmit={() => handleCreateEmail()}>
          <TextField
            required
            className={classes.campaignTitleTextField}
            onChange={() => setCampaignTitle(event.target.value)}
            id="campaign-title"
            label="Campaign Title"
            size="small"
            value={campaignTitle}
            variant="outlined"
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 16, color: "#D3D3D3" } }}
          />

          <TextField
            required
            className={classes.subjectTextField}
            onChange={() => setCampaignSubject(event.target.value)}
            id="campaign-subject"
            label="Subject Line"
            size="small"
            value={campaignSubject}
            variant="outlined"
            InputLabelProps={{ style: { color: "#D3D3D3" } }}
          />
          <TextField
            required
            className={classes.previewTextField}
            onChange={() => setCampaignPreviewText(event.target.value)}
            id="campaign-preview-text"
            label="Preview Text"
            size="small"

            value={campaignPreviewText}
            variant="outlined"
            InputLabelProps={{ style: { color: "#D3D3D3" } }}
          />
          <TextField
            required
            className={classes.bodyTextField}
            onChange={() => setCampaignBodyText(event.target.value)}
            id="campaign-body"
            multiline
            size="large"
            label="Email Body"
            value={campaignBodyText}
            InputLabelProps={{ style: { color: "#D3D3D3" } }}
          />
          <div className={classes.footerCheckDiv}>
            <FormControlLabel
              control={
                <Checkbox
                  id="footer-checkbox"
                  defaultChecked
                  color="secondary"
                  label="Include Pre-Built Footer?"
                  checked={footerChecked}
                  onChange={toggleCheckBox}
                  inputProps={{ "aria-label": "include footer toggle" }}
                />
              }
              label="Include Footer?"
            />
          </div>
          <div>
            <Button style={{ margin: "6px" }} variant="contained" type="submit">
              CREATE
            </Button>
            <Button
              style={{ margin: "6px" }}
              variant="contained"
              color="error"
              onClick={() => clearInputs()}
            >
              CLEAR
            </Button>
          </div>
        </form>
      </Paper>
      {/* {JSON.stringify(subs[0][0].email_address)} */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
