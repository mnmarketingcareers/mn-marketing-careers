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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useStyles from "../Styles/Styles";

function Campaign() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const user = useSelector((store) => store.user);
  const subs = useSelector((store) => store.setSubsListReducer); //incoming full subs list from redux /mailchimp
  const templateList = useSelector((store) => store.setTemplatesReducer); //incoming full templates list from redux /mailchimp

  const [subList, setSubList] = useState([]); //to set state of subs

  //states for fields
  const [templateId, setTemplateId] = useState(""); //updated
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignPreviewText, setCampaignPreviewText] = useState("");
  const [campaignBodyText, setCampaignBodyText] = useState("");
  const [footerChecked, setFooterChecked] = useState(true); //state of "use footer?" checkbox
  const [emailArray, setEmailArray] = useState([]);

  useEffect(() => {
    dispatch({ type: "GET_SUBS" });
    dispatch({ type: "GET_TEMPLATES" }); //get all existing template IDs to choose from!
    setSubList(subs.data);
    console.log("subList is:", subList);
  }, []);

  const toggleCheckBox = (event) => {
    setFooterChecked(event.target.checked); //toggle to opposite on click checkbox
    console.log("Include pre-built footer?", event.target.checked);
  };

  //this function creates and SAVES an email
  const handleCreateCampaign = () => {
    // setEmailArray([]);
    // for (let email of subs[0]) {
    //   emailArray.push({name: email.full_name, mail: email.email_address});
    //   emailArray.push(email.email_address); //deletelater ???
    // }
    console.log("subs email array:", emailArray);
    console.log("Number of recipients:", emailArray.length);
    console.log('Template ID:', parseInt(templateId)); //updated
    console.log("Title:", campaignTitle);
    console.log("Subject:", campaignSubject);
    console.log("Preview Text:", campaignPreviewText);
    console.log("Footer?:", footerChecked);
    console.log("Recipients?:", subs[0]);

    dispatch({
      type: "CREATE_CAMPAIGN",
      payload: {
        type: "regular", // this or plain text? Ask Casey
        from_name: "MNMC Dev Team", // the "from" name that appears
        reply_to: "cmochinski@gmail.com", // made up - do they have a real one?
        template_id: parseInt(templateId), //coming back from template creation //updated
        title: campaignTitle,
        subject_line: campaignSubject,
        preview_text: campaignPreviewText,
        // footer: footerChecked,
        recipients: subs[0],
      },
    });
  };

  const clearInputs = () => {
    setTemplateId(""); //updated
    setCampaignTitle("");
    setCampaignSubject("");
    setCampaignPreviewText("");
    setCampaignBodyText("");
  };

  // this function is part of the ternary operator that makes a button appear if all fields are filled out
  // if any field is blank, this green SEND button does not show up
  const sendEmailButton = () => {
    return (
      <Button
        style={{ margin: "6px" }}
        variant="contained"
        color="success"
        onClick={() => sendEmailNow()}
      >
        SEND
      </Button>
    );
  };

  // this is the function that SENDS the email
  const sendEmailNow = () => {
    console.log("in send email now! LOOK OUT BELOOWWWWW");
    dispatch({
      type: "SEND_EMAIL_NOW",
      payload: { campaign_id: "83c885d177" }, //FIX - need to get this from the SAVED campaign
    });
  };

  //fix
  const getCampaigns = () => {
    console.log("in getCampaigns function");
    dispatch({ type: "GET_CAMPAIGN" });
  };


  const handleSelectTemplateId = (event) => {
    console.log("selected template id:", event.target.value);
    setTemplateId(event.target.value);
  };



  return (
    <div className="container">
      <br />
      <Typography
        style={{ textAlign: "center", marginBottom: "25px" }}
        variant="h3"
      >
        New Email Campaign
      </Typography>

      <Typography style={{ textAlign: "center", margin: 'auto', paddingBottom: '30px', width: '80%' }}>
        AS OF 11/16/21 @ 4:40 PM - this page allows a user to BUILD THE SENDABLE
        EMAIL ATTRIBUTES - Campaign title (not sent - just for admin side),
        email subject line, and email subject preview text
      </Typography>

      <Paper className={classes.campaignPaperContainer} elevation={6}>
        {/* <Typography variant="h6" style={{ margin: "10px 50px" }}>
          This page is used to create and save or send your finalized email
          campaign. Follow the prompts below to continue. Once all fields are
          filled out, the button to SEND NOW will appear.
        </Typography> */}
        <form onSubmit={() => handleCreateCampaign()}>

        <FormControl required style={{ width: "50%" }}>
              <InputLabel id="template-id-select-label">Template</InputLabel>

              <Select
                className={classes.templateIdSelect}
                labelId="template-id-select-label"
                id="template-id-select"
                label="template"
                value={templateId}
                onChange={handleSelectTemplateId}
              >
                {templateList.length > 0 ? (
                  templateList[0].map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <img src="./images/Pendulum.gif" />
                )}
              </Select>
            </FormControl>

<br /><br />

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
            label="Email Subject Line"
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
            label="Email Preview Text"
            size="small"
            value={campaignPreviewText}
            variant="outlined"
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
              SAVE
            </Button>

            {templateId &&
            campaignTitle &&
            campaignSubject &&
            campaignPreviewText ? (
              sendEmailButton()
            ) : (
              <></>
            )}

            <Button
              style={{ margin: "6px" }}
              variant="contained"
              color="error"
              onClick={() => clearInputs()}
            >
              CLEAR
            </Button>
            <br />
            <br />

        
        {/* //-------------DEV SECTION BELOW (DELETE LATER)----------------// */}



            <Button
              //important this button is strictly for developer aid
              style={{ margin: "6px" }}
              variant="contained"
              color="secondary"
              onClick={() => getCampaigns()}
            >
              TEMP - GET CAMPAIGN LIST <br />
              (terminal only)
            </Button>
          </div>
        </form>
      </Paper>
      {/* {JSON.stringify(subs[0][0].email_address)} */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Campaign;
