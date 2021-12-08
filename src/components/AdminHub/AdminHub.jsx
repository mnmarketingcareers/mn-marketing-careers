import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Container, Button } from "@mui/material";

import NewPostingsReady from "../NewJobOpeningsReadyAlert/NewJobOpeningsReadyAlert";
import NewSubmissions from "../NewSubmissionsAlert/NewSubmissionsAlert";
import NewIssues from "../NewIssusAlert/NewIssuesAlert";
import useStyles from "../Styles/Styles";

import AdminHubFourColTable from "./AdminHubFourColTable";
import AdminHubThreeColTable from "./AdminHubThreeColTable";
import AdminHubTwoColTable from "./AdminHubTwoColTable";

import "./AdminHub.css";
import AdminHubManualSubEntryForm from "./AdminHubManualSubEntryForm";
import UserList from "../UserList/UserList";

const AdminHub = () => {
  const history = useHistory();
  const classes = useStyles(); //important paste this
  const dispatch = useDispatch();
  const subs = useSelector((store) => store.setSubsListReducer);
  const user = useSelector((store) => store.user);

  //loading and redux state
  const [isLoading, setIsLoading] = useState(false);
  const [subList, setSubList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    dispatch({ type: "GET_SUBS" });
    setSubList(subs.data);
  }, [subList]);

  const toggleSubStatus = (subStatus, id) => {
    let newStatus = "";
    subStatus === "subscribed"
      ? (newStatus = "unsubscribed")
      : (newStatus = "subscribed");
    dispatch({
      type: "TOGGLE_SUB_STATUS",
      payload: { status: newStatus, subscriberHash: id },
    });
  };

  const handleAddJob = () => {
    history.push("/adminaddjob");
  };

  const toUnsubscribeInfo = () => {
    history.push("/unsubscribeinfo");
  }

  return (
    <div className="adminHubPage">
      <Typography className={classes.adminHeader}>
        Hi {user.first_name}!
      </Typography>

      <Container className="adminContainer" style={{ textAlign: "center" }}>
        <Button
          style={{ margin: "5px" }}
          variant="contained"
          size="large"
          color="primary"
          onClick={() => history.push("/emailtemplate")}
        >
          CREATE CAMPAIGN
        </Button>
        <Button variant="contained" size="large" onClick={handleAddJob}>
          Add Some Jobs
        </Button>
        <br />

        <div style={{ marginTop: "20px" }} className="gridWrapper">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <div>
                <NewSubmissions />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <div>
                <NewIssues />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <div>
                <NewPostingsReady />
              </div>
            </Grid>
          </Grid>

          <AdminHubManualSubEntryForm />
          <AdminHubFourColTable subs={subs} toggleSubStatus={toggleSubStatus} />
          <AdminHubThreeColTable
            subs={subs}
            toggleSubStatus={toggleSubStatus}
          />
          <AdminHubTwoColTable subs={subs} toggleSubStatus={toggleSubStatus} />
        </div>
        <UserList />
        <Button variant="contained" onClick={toUnsubscribeInfo}>UNSUBSCRIBER INFO</Button>
      </Container>
    </div>
  );
};

export default AdminHub;
