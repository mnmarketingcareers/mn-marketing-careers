import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Typography,
  Button,
  Paper,
  TextField,
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
  const templateList = useSelector((store) => store.setTemplatesReducer); //incoming full templates list from redux /mailchimp

  const [newOrMod, setNewOrMod] = useState(""); //set if user wants to use a new or old campaign

  //states for fields
  const [templateId, setTemplateId] = useState(""); //updated
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignPreviewText, setCampaignPreviewText] = useState("");
  const [campaignBodyText, setCampaignBodyText] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_TEMPLATES" }); //get all existing template IDs to choose from!
    dispatch({ type: "GET_CAMPAIGNS" });
  }, []);

  //this function creates and SAVES an email
  const handleCreateCampaign = (event) => {
    event.preventDefault();
    dispatch({
      type: "CREATE_CAMPAIGN",
      payload: {
        type: "regular", // this or plain text? Ask Casey
        from_name: "Minnesota Marketing Careers", // the "from" name that appears
        reply_to: "mnmarketingcareers@gmail.com", // made up - do they have a real one?
        template_id: parseInt(templateId), //coming back from template creation //updated
        title: campaignTitle,
        subject_line: campaignSubject,
        preview_text: campaignPreviewText,
        footer: false,
      },
    });
    history.push("/finalizeandsendcampaign");
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
    setTemplateId(event.target.value);
  };

  return (
    <div className="container">
      <br />
      <Typography
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontWeight: "600",
          fontFamily: "Red Hat Text",
        }}
        variant="h4"
      >
        Email Details
      </Typography>

      <Paper className={classes.campaignPaperContainer} elevation={6}>
        <form onSubmit={() => handleCreateCampaign()}>
          
          <br />

          <FormControl required style={{ width: "220px" }}>
            <InputLabel id="template-id-select-label">
              Select Template
            </InputLabel>

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

          <br />
          <br />

          <TextField
            required
            className={classes.campaignTitleTextField}
            onChange={() => setCampaignTitle(event.target.value)}
            id="campaign-title"
            label="Campaign Title"
            value={campaignTitle}
            variant="outlined"
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: "18px" } }}
          />

          <TextField
            required
            className={classes.subjectTextField}
            onChange={() => setCampaignSubject(event.target.value)}
            id="campaign-subject"
            label="Email Subject Line"
            value={campaignSubject}
            variant="outlined"
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: "18px" } }}
          />

          <div>
            <Button
              style={{
                margin: "15px 6px 0",
                fontSize: "20px",
                fontWeight: "600",
              }}
              variant="contained"
              type="submit"
            >
              SAVE & NEXT
            </Button>

            <Button
              style={{
                margin: "15px 6px 0",
                fontWeight: "600",
                fontSize: "20px",
                backgroundColor: "#FFA384",
              }}
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
