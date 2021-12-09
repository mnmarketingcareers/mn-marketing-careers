import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useStyles from "../Styles/Styles";

const EmailTemplate = () => {
  const history = useHistory();
  const templateList = useSelector((store) => store.setTemplatesReducer);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newOrMod, setNewOrMod] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateBodyText, setTemplateBodyText] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_TEMPLATES" }); 
  }, []);

  const handleSubmitPatchTemplate = () => {
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
    setTemplateId(event.target.value);
  };

  const handleSelectNewOrMod = (event) => {
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


      <h1 style={{ textAlign: "center", margin: "15px", fontFamily: 'Red Hat Text', fontSize: '45px' }}> New Email </h1>
     

      <Paper className={classes.templatePaperContainer} elevation={6}>
        <form onSubmit={() => handleSubmitPatchTemplate()}>
          <FormControl required style={{ width: "220px"}}>
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
            value={templateName}
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            inputProps={{ style: { fontSize: 18 } }}

            InputLabelProps={{ style: {fontSize: '18px'} }}
          />
          <br />
          <br />
        

          <Button
            //this button is always here
            //button above body text field
            //appears at over 2k characters
            variant="contained"
            color="success"
            style={{margin: '4px', fontSize: '20px', fontWeight: '600', }}

            type="submit"
          >
            SUBMIT
          </Button>
          <Button
            onClick={() => clearFields()}
            variant="contained"
            style={{margin: '4px', fontWeight: '600', fontSize: '20px', backgroundColor: '#FFA384'}}
          >
            CLEAR
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default EmailTemplate;
