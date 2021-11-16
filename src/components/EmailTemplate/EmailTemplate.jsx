import React, { useState, useEffect } from "react";
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
  MenuItem
} from "@mui/material";
import useStyles from "../Styles/Styles";

const EmailTemplate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [templateId, setTemplateId] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateBody, setTemplateBody] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_TEMPLATES" }); //fetches all existing template IDs to choose from
  });

  const handleSubmitPatchTemplate = () => { //submits template patch to selected
    console.log("in handleSubmitPatchTemplate");
    console.log("templateId =", templateId);
    console.log("templateName =", templateName);
    console.log("templateBody =", templateBody);
    dispatch({
      type: "SEND_PATCH_TEMPLATE",
      payload: {
        template_id: templateId,
        name: templateName,
        html: templateBody,
      },
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "30px" }}> Template </h1>

      <Paper className={classes.campaignPaperContainer} elevation={8}>
        <form onSubmit={() => handleSubmitPatchTemplate()}>
        
        {/* <FormControl >

  <InputLabel id="demo-simple-select-label">Template ID</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="select-template-id"
    value={templateId}
    style={{width: '300px', textAlign: 'center'}}
    // label="Template ID"
    onChange={() => setTemplateId(event.target.value)}
  >
    <MenuItem value={2434573}>2434573</MenuItem>
    <MenuItem value={3488322}>3488322</MenuItem>
    <MenuItem value={4584478}>4584478</MenuItem>
  </Select>
  </FormControl> */}





          <TextField
            required
            className={classes.templateIdTextField}
            onChange={() => setTemplateId(event.target.value)}
            id="template-id"
            label="Template ID"
            size="small"
            value={templateId}
            variant="outlined"
            InputLabelProps={{ style: { color: "#D3D3D3" } }}
          />
          <TextField
            className={classes.subjectTextField}
            onChange={() => setTemplateName(event.target.value)}
            id="template-name"
            label="New Template Name (optional)"
            size="small"
            value={templateName}
            variant="outlined"
            InputLabelProps={{ style: { color: "#D3D3D3" } }}
          />

          <TextField
            required
            multiline
            className={classes.bodyTextField}
            onChange={() => setTemplateBody(event.target.value)}
            id="template-email-body"
            label="Email Body"
            size="small"
            value={templateBody}
            variant="outlined"
            InputLabelProps={{ style: { color: "#D3D3D3" } }}
          />
          <br />
          <Button variant="contained" color="success" type="submit">
            SUBMIT
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default EmailTemplate;
