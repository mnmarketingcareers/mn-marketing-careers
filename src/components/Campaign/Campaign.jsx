import React, { useState, useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  // const user = useSelector((store) => store.user);
  const templateList = useSelector((store) => store.setTemplatesReducer); //incoming full templates list from redux /mailchimp

  const [subList, setSubList] = useState([]); //to set state of subs

  const [newOrMod, setNewOrMod] = useState(""); //set if user wants to use a new or old campaign


  //states for fields
  const [templateId, setTemplateId] = useState(""); //updated
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignPreviewText, setCampaignPreviewText] = useState("");
  const [campaignBodyText, setCampaignBodyText] = useState("");
  const [footerChecked, setFooterChecked] = useState(true); //state of "use footer?" checkbox
  const [emailArray, setEmailArray] = useState([]);

  useEffect(() => {
    dispatch({ type: "GET_TEMPLATES" }); //get all existing template IDs to choose from!
    dispatch({ type: "GET_CAMPAIGNS" });
  }, []);

  const toggleCheckBox = (event) => {
    setFooterChecked(event.target.checked); //toggle to opposite on click checkbox
    console.log("Include pre-built footer?", event.target.checked);
  };

  //this function creates and SAVES an email
  const handleCreateCampaign = () => {
   
    console.log("subs email array:", emailArray);
    console.log("Number of recipients:", emailArray.length);
    console.log('Template ID:', parseInt(templateId)); //updated
    console.log("Title:", campaignTitle);
    console.log("Subject:", campaignSubject);
    console.log("Preview Text:", campaignPreviewText);
    console.log("Footer?:", footerChecked);
    // console.log("Recipients?:", subs[0]);

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
        footer: false,

      },
    });
    history.push('/finalizeandsendcampaign')

  };

  const clearInputs = () => {
    setNewOrMod("");
    setTemplateId("");
    setCampaignTitle("");
    setCampaignSubject("");
    setCampaignPreviewText("");
    setCampaignBodyText("");
  };



  const handleSelectTemplateId = (event) => {
    console.log("selected template id:", event.target.value);
    setTemplateId(event.target.value);
  };

  const handleSelectCampaignId = () => {
    console.log("selected campaign id:", event.target.value)
  }

  const handleSelectNewOrMod = (event) => {
    console.log("user has chosen", event.target.value);
    setNewOrMod(event.target.value);
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


      <Paper className={classes.campaignPaperContainer} elevation={6}>
        <form onSubmit={() => handleCreateCampaign()}>
          <br />

          {newOrMod === "new" || newOrMod === "" ? (
            <></>
          ) : (
        <FormControl required style={{ width: "50%" }}
        //important DROPDOWN OF CAMPAIGNS
        >
              <InputLabel id="template-id-select-label">Select Campaign</InputLabel>

              <Select
                className={classes.templateIdSelect}
                labelId="template-id-select-label"
                id="template-id-select"
                label="template"
                value={templateId}
                onChange={handleSelectCampaignId}
              >
                {templateList.length > 0 ? (//IMPORTANT MAP LIST OF CAMPAIGNS!
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
          )}
            <br/><br />


        <FormControl required style={{ width: "50%" }}>
              <InputLabel id="template-id-select-label">Select Template</InputLabel>

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
              SAVE & NEXT
            </Button>


           
{/* 
            {templateId &&
            campaignTitle &&
            campaignSubject &&
            campaignPreviewText ? (
              sendEmailButton()
            ) : (
              <></>
            )} */}



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

          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Campaign;
