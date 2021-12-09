import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Container, Typography, Button, Paper } from "@mui/material";

//For the snackbar
import useStyles from "../Styles/Styles";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function Campaign() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeCampaign = useSelector((store) => store.setActiveCampaignReducer); //info coming back for NOW ACTIVE CAMPAIGN

  useEffect(() => {
    dispatch({ type: "GET_TEMPLATES" }); //get all existing template IDs to choose from!
    dispatch({ type: "GET_CAMPAIGNS" }); //get all campaigns!!!!!
  }, []);

  // this is the function that SENDS the email
  const sendEmailNow = (campaignId) => {
    dispatch({
      type: "SEND_EMAIL_NOW",
      payload: { campaign_id: campaignId },
    });

    // post approved jobs to the list now
    dispatch({ type: "POST_APPROVED_JOBS" });
    setOpen(true);
  };

  // For the snackbar button.
  const [open, setOpen] = useState(false);

  // For the Snackbar button when the SEND button is pressed.
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // For the Snackbar button when the SEND button is pressed.
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="container">
      <br />
      <Typography
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "600",
          marginBottom: "25px",
          fontFamily: "Red Hat Text",
        }}
        variant="h4"
      >
        Review & Send
      </Typography>

      <Paper className={classes.campaignPaperContainer} elevation={6}>
        {activeCampaign.id != undefined ? (
          <>
            <Container>
              <Typography className={classes.emailConfirmText}>
                Campaign ID: <b>{activeCampaign.id}</b>
              </Typography>
              <Typography className={classes.emailConfirmText}>
                Campaign Title: <b>{activeCampaign.settings.title}</b>
              </Typography>
              <Typography className={classes.emailConfirmText}>
                Email Subject Line:{" "}
                <b>{activeCampaign.settings.subject_line}</b>
              </Typography>
              <Typography className={classes.emailConfirmText}>
                From Name: <b>{activeCampaign.settings.from_name}</b>
              </Typography>
              <Typography className={classes.emailConfirmText}>
              Sending to: <b>{activeCampaign.recipients.recipient_count}</b>{" "}
                recipients
              </Typography>
              <Typography className={classes.emailConfirmText}>
                Template ID: <b>{activeCampaign.settings.template_id}</b>
              </Typography>

              <br />
              <Container style={{ textAlign: "center" }}>
                <a href={activeCampaign.archive_url} target="_blank">
                  <Button
                    style={{
                      padding: "14px, 18px",
                      marginBottom: "50px",
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

            <Button
              style={{
                margin: "5px 4px 0",
                fontSize: "18px",
                fontWeight: "600",
              }}
              variant="contained"
              color="success"
              onClick={() => sendEmailNow(activeCampaign.id)}
            >
              SEND
            </Button>

            <Button
              style={{
                margin: "5px 4px 0",
                fontWeight: "600",
                fontSize: "18px",
              }}
              variant="contained"
              color="secondary"
              onClick={() => history.push("/emailtemplate")}
            >
              START OVER
            </Button>

            <Button
              style={{
                margin: "5px 4px 0",
                fontWeight: "600",
                fontSize: "18px",
                backgroundColor: "#FFA384",
              }}
              variant="contained"
              onClick={() => history.push("/adminhub")}
            >
              CANCEL
            </Button>
          </>
        ) : (
          <div style={{ margin: "50px" }}>
            <img src="./images/Pendulum.gif" width="90px" />
            <Typography
              variant="h6"
              style={{ marginTop: "20px", fontFamily: "Red Hat Text" }}
            >
              Building Email...
            </Typography>
          </div>
        )}

        <br />
        <br />
      </Paper>
      <Stack spacing={2} sx={{ width: "350px" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "350px" }}
          >
            Email Sent!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default Campaign;
