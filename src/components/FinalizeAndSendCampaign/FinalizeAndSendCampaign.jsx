import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
} from "@mui/material";

//For the snackbar
import useStyles from "../Styles/Styles";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function Campaign() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const templateList = useSelector((store) => store.setTemplatesReducer); //incoming full templates list from redux /mailchimp
  const activeCampaign = useSelector((store) => store.setActiveCampaignReducer); //hopefully info coming back for NOW ACTIVE CAMPAIGN
  const allCampaigns = useSelector((store) => store.setCampaignsReducer);


  useEffect(() => {
    dispatch({ type: "GET_TEMPLATES" }); //get all existing template IDs to choose from!
    dispatch({ type: "GET_CAMPAIGNS" }); //get all campaigns!!!!!
  }, []);


  // this is the function that SENDS the email
  const sendEmailNow = (campaignId) => {
    console.log("in send email now! Campaign Id:", campaignId);
    dispatch({
      type: "SEND_EMAIL_NOW",
      payload: { campaign_id: campaignId },
    });

    // post approved jobs to the list now
    dispatch({ type: 'POST_APPROVED_JOBS'});
    //history.push('/adminhub')

    setOpen(true);
   
  };

  // For the snackbar button.
  const [open, setOpen] = useState(false);

  // For the Snackbar button when the SEND button is pressed.
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

  };

  // For the Snackbar button when the SEND button is pressed.
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // For the Snackbar button when the SEND button is pressed.
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

  });




  return (
    <div className="container">
      <br />
      <Typography
        style={{ textAlign: "center", marginBottom: "30px", fontFamily: 'Red Hat Text' }}
        variant="h3"
      >
        Ready To Send?
      </Typography>

      <Paper className={classes.campaignPaperContainer} elevation={6}>


        {activeCampaign.id != undefined ? (
          <>
            <Container>
              <Typography className={classes.emailConfirmText}>Campaign ID: {activeCampaign.id}</Typography>
              <Typography className={classes.emailConfirmText}>
                Campaign Title: {activeCampaign.settings.title}
              </Typography>
              <Typography className={classes.emailConfirmText}>
                Campaign Subject: {activeCampaign.settings.subject_line}
              </Typography>
              <Typography className={classes.emailConfirmText}>
                Campaign Preview Text: {activeCampaign.settings.preview_text}
              </Typography>
              <Typography className={classes.emailConfirmText}>
                From Name: {activeCampaign.settings.from_name}
              </Typography>
              <Typography className={classes.emailConfirmText}>
                Sending to: {activeCampaign.recipients.recipient_count}{" "}
                recipients
              </Typography>
              <Typography className={classes.emailConfirmText}>
                Template ID: {activeCampaign.settings.template_id}
              </Typography>

              <br />
              <br />
              <Container style={{ textAlign: "center" }}>
                <a href={activeCampaign.archive_url} target="_blank">
                  <Button
                    style={{
                      margin: "6px",
                      padding: "14px, 18px",
                      fontSize: "22px",
                    }}
                    variant="contained"
                    size="large"
                  >
                    <b>Preview In Browser</b>
                  </Button>
                </a>
              </Container>
            </Container>


            <br />
            <br />


            <Button
              style={{ margin: "6px", padding: "14px, 18px", fontSize: "22px" }}
              variant="contained"
              color="success"
              size="large"
              onClick={() => sendEmailNow(activeCampaign.id)}
            >
              SEND
            </Button>
            <br />

            <Button
              style={{ margin: "6px" }}
              variant="contained"
              color="secondary"
              onClick={() => history.push("/emailtemplate")}
            >
              START OVER
            </Button>
            <br />

            <Button
              style={{ margin: "6px" }}
              variant="contained"
              color="error"
              onClick={() => history.push("/adminhub")}
            >
              CANCEL
            </Button>

          </>
        ) : (
          <div style={{ margin: '50px' }}>
            <img src="./images/Pendulum.gif" width="90px" />
            <Typography variant="h6" style={{ marginTop: '20px', fontFamily: 'Red Hat Text' }}>Building Email...</Typography>
          </div>
        )}


        <br />
        <br />
      </Paper>
      <Stack spacing={2} sx={{ width: '350px' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={Slide}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '350px' }}>
            Email Sent!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );

}

export default Campaign;
