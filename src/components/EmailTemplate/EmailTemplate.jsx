import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Typography,
  Button,
  Paper,
  TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useStyles from "../Styles/Styles";
import EmailBody from "../EmailBody/EmailBody"; //important this is the huge HTML string for email world

const EmailTemplate = () => {
  const history = useHistory();
  const templateList = useSelector((store) => store.setTemplatesReducer);
  const classes = useStyles();
  const dispatch = useDispatch();
  const emailBody = EmailBody(); //important inside a variable

  const [newOrMod, setNewOrMod] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateBodyText, setTemplateBodyText] = useState("");

  useEffect(() => {
    console.log('email body is:', emailBody)
    dispatch({ type: "GET_TEMPLATES" }); 
  }, []);

  const handleSubmitPatchTemplate = () => {
   
    const bodyToSubmit = templateBodyText; //THIS is where the user's input is entering our crazy HTML
    console.log("in handleSubmitPatchTemplate");
    console.log("templateId =", templateId);
    console.log("templateName =", templateName);
    console.log("templateBody =", templateBodyText);
    console.log("bodyToSubmit =", bodyToSubmit);

    if (newOrMod === "mod") {
      dispatch({
        type: "SEND_PATCH_TEMPLATE",
        payload: {
          template_id: templateId,
          name: templateName,
          html: 'test', //important email body coming in from EmailBody component
        },
      });
    } else {
      dispatch({
        type: "SEND_POST_TEMPLATE",
        payload: {
          name: templateName,
          html: 'test', //important email body coming in from EmailBody component
        },
      });
    }
    history.push("/campaign");
  };

  const handleSelectTemplateId = (event) => {
    console.log("selected template id:", event.target.value);
    setTemplateId(event.target.value);
  };

  const handleSelectNewOrMod = (event) => {
    console.log("user has chosen", event.target.value);
    setNewOrMod(event.target.value);
  };

  const clearFields = () => {
    setNewOrMod("");
    setTemplateId("");
    setTemplateName("");
    setTemplateBodyText("");
  };

  return (
    <div className={classes.templatePageContainer}>



      {/* <EmailBody /> */}



      <h1 style={{ textAlign: "center", margin: "15px" }}> Template </h1>
      <Typography
        style={{
          textAlign: "center",
          margin: "auto",
          paddingBottom: "30px",
          width: "80%",
        }}
      >
        AS OF 11/16/21 @ 4:40 PM - this page allows a user to create a new email
        template (POST) and give that template a name as well as a body. That
        body is HTML and can be sent as plain text BUT...I need to BUILD EMAIL
        STYLING...inception style
      </Typography>

      <Paper className={classes.templatePaperContainer} elevation={12}>
        <form onSubmit={() => handleSubmitPatchTemplate()}>
          <FormControl required style={{ width: "30%" }}>
            <InputLabel id="new-or-mod-label">Select</InputLabel>

            <Select
              className={classes.newOrModSelect}
              labelId="new-or-mod-label"
              id="template-id-select"
              label="Select"
              value={newOrMod}
              onChange={handleSelectNewOrMod}
            >
              <MenuItem value={"new"}>New Template</MenuItem>
              <MenuItem value={"mod"}>Modify Template</MenuItem>
            </Select>
          </FormControl>

          <br />
          <br />

          {newOrMod === "new" || newOrMod === "" ? (
            <></>
          ) : (
            <FormControl required style={{ width: "50%" }}>
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
          )}

          <TextField
            className={classes.templateNameField}
            onChange={() => setTemplateName(event.target.value)}
            id="template-name"
            label="New Template Name"
            size="small"
            value={templateName}
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            InputLabelProps={{ style: { color: "#D3D3D3" } }}
          />
          <br />
          <br />
          {templateBodyText.length > 3000 ? (
            <Button variant="contained" color="success" type="submit">
              SUBMIT
            </Button>
          ) : (
            <></>
          )}
          <br />
          {/* <TextField
            required
            multiline
            className={classes.bodyTextField}
            onChange={() => setTemplateBodyText(event.target.value)}
            id="template-email-body"
            label="Email Body"
            size="large"
            value={templateBodyText}
            variant="outlined"
            InputLabelProps={{ style: { color: "#D3D3D3" } }}
          /> */}
          <br />

          <Button
            //this button is always here
            //  button above body text field
            //  appears at over 2k characters
            variant="contained"
            color="success"
            style={{margin: '4px'}}

            type="submit"
          >
            SUBMIT
          </Button>
          <Button
            onClick={() => clearFields()}
            variant="contained"
            color="error"
            style={{margin: '4px'}}
          >
            CLEAR
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default EmailTemplate;
