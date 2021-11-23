import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  Container,
  Button,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import NewPostingsReady from "../NewJobOpeningsReadyAlert/NewJobOpeningsReadyAlert";
import NewSubmissions from "../NewSubmissionsAlert/NewSubmissionsAlert";
import NewIssues from "../NewIssusAlert/NewIssuesAlert";
import useStyles from "../Styles/Styles"; //important paste this

import "./AdminHub.css";

const AdminHub = () => {
  const history = useHistory();
  const classes = useStyles(); //important paste this
  const dispatch = useDispatch();
  const subs = useSelector((store) => store.setSubsListReducer);
  const user = useSelector((store) => store.user);

  //loading and redux state
  const [isLoading, setIsLoading] = useState(false);
  const [subList, setSubList] = useState([]);

  //manual user entry info
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userZip, setUserZip] = useState("");

  //user sub status
  const [subStatus, setSubStatus] = useState(""); //deletelater

  useEffect(() => {
    setIsLoading(true);
    console.log("page loaded - fetching subscribers...");
    dispatch({ type: "GET_SUBS" });
    setSubList(subs.data);
    console.log("user is:", user.first_name);
  }, [subList]);

  //check email - is it real? if keep required attribute
  const validateEmail = () => {
    if (userEmail.indexOf("@") > -1) {
      submit();
    } else {
      alert("invalid email!");
    }
  };

  // new subscriber admin post!
  const submit = () => {
    const userAddress = {
      addr1: "test addr",
      city: "test city",
      state: "test state",
      zip: userZip,
    };
    console.log(
      "valid!! sending:",
      userEmail,
      userFirstName,
      userLastName,
      userZip
    );
    dispatch({
      type: "ADD_SUBSCRIBER",
      payload: {
        email: userEmail,
        firstName: userFirstName,
        lastName: userLastName,
        address: userAddress,
      },
    });
    setUserEmail("");
    setUserFirstName("");
    setUserLastName("");
    setUserZip("");
  };

  const toggleSubStatus = (subStatus, id) => {
    let newStatus = "";
    subStatus === "subscribed"
      ? (newStatus = "unsubscribed")
      : (newStatus = "subscribed");
    console.log("current status:", subStatus, "for user:", id);
    dispatch({
      type: "TOGGLE_SUB_STATUS",
      payload: { status: newStatus, subscriberHash: id },
    });
  };

  const handleAddJob = () => {
    history.push("/adminaddjob");
  };

  return (
    <div className="adminHubPage">
      <Typography

        className={classes.adminHeader}
      >
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
        {/* <Button style={{margin: '5px'}} variant="outlined" onClick={() => navToCreateTemplatePage()}>Create Email Template</Button> */}
        <br />

        <div style={{ marginTop: "20px" }} className="gridWrapper">
          {/* <Button variant="contained" onClick={handleAddJob} >Add Some Jobs</Button> */}
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
          <div>
            <Typography variant="h4" className={classes.subEntryHeader}>Manual Subscriber Entry</Typography>
            <form onSubmit={() => validateEmail()}>
              <TextField
                value={userEmail}
                type="email"
                id="email"
                size="small"
                placeholder="Email"
                style={{ width: "200px", margin: '4px' }}
                onChange={(event) => setUserEmail(event.target.value)}
              />{" "}
              <br />
              <TextField
                value={userFirstName}
                type="text"
                id="firstName"
                size="small"
                placeholder="First Name"
                style={{ width: "200px", margin: '4px'  }}
                onChange={(event) => setUserFirstName(event.target.value)}
              />
              <br />
              <TextField
                value={userLastName}
                type="text"
                id="lastName"
                size="small"
                placeholder="Last Name"
                style={{ width: "200px", margin: '4px'  }}
                onChange={(event) => setUserLastName(event.target.value)}
              />
              <br />
              <TextField
                value={userZip}
                type="text"
                id="email"
                size="small"
                placeholder="Zip Code"
                style={{ width: "200px", margin: '4px'  }}
                onChange={(event) => setUserZip(event.target.value)}
              />
              <br />
              <Button
                style={{ margin: "15px" }}
    
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </form>
            <br />
          </div>

          {/* ---------- FOUR COLUMN TABLE ON 3000 PX (AKA nothing is too big, hopefully) ---------- */}


          <div className="fourColTable">
            <Typography
              variant="h4"
              className={classes.fullSubListHeader}
            >
              Full Subscriber List:
            </Typography>

            <Paper elevation={4} className="adminPaper" >
              <Grid>
                <TableContainer sx={{ maxHeight: 470 }}>
                  <Table
                    className="tableMain"
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        <TableCell className={classes.tableHeaderCell}>
                          Name
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                          Email
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                          Zip Code
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="adminTableBody">
                      {subs.length > 0 ? (
                        subs[0].map((item) => (
                          <TableRow
                            key={item.id}
                            className={classes.tableBodyRow}
                          >
                            <TableCell className={classes.tableCell}>
                              {item.full_name}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {item.email_address}
                            </TableCell>

                            <TableCell className={classes.tableCell}>
                              {item.merge_fields.ADDRESS.zip}
                            </TableCell>

                            <TableCell className={classes.tableCell}>
                              {item.status}

                              <IconButton
                              onClick={() =>
                                toggleSubStatus(item.status, item.contact_id)
                              }
                            >
                              <ToggleOffIcon />
                            </IconButton>


                            </TableCell>
                            
                          </TableRow>
                        ))
                      ) : (
                        <img src="./images/Pendulum.gif" />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Paper>
        
          </div>

{/* ---------- THREE COLUMN TABLE ON 600 PX ---------- */}


<div className="threeColTable">
            <Typography
              variant="h4"
              className={classes.fullSubListHeader}
            >
              Full Subscriber List:
            </Typography>

            <Paper elevation={4} className="adminPaper" >
              <Grid>
                <TableContainer sx={{ maxHeight: 470 }}>
                  <Table
                    className="tableMain"
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        <TableCell className={classes.tableHeaderCell}>
                          Name
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                          Email
                        </TableCell>
                        {/* <TableCell className={classes.tableHeaderCell}>
                          Zip Code
                        </TableCell> */}
                        <TableCell className={classes.tableHeaderCell}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="adminTableBody">
                      {subs.length > 0 ? (
                        subs[0].map((item) => (
                          <TableRow
                            key={item.id}
                            className={classes.tableBodyRow}
                          >
                            <TableCell className={classes.tableCell}>
                              {item.full_name}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {item.email_address}
                            </TableCell>

                            {/* <TableCell className={classes.tableCell}>
                              {item.merge_fields.ADDRESS.zip}
                            </TableCell> */}

                            <TableCell className={classes.tableCell}>
                              {item.status}

                              <IconButton
                              onClick={() =>
                                toggleSubStatus(item.status, item.contact_id)
                              }
                            >
                              <ToggleOffIcon />
                            </IconButton>


                            </TableCell>
                            
                          </TableRow>
                        ))
                      ) : (
                        <img src="./images/Pendulum.gif" />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Paper>
        
          </div>

{/* ---------- TWO COLUMN TABLE ON 600 PX ---------- */}


<div className="twoColTable">
            <Typography
              variant="h4"
              className={classes.fullSubListHeader}
            >
              Full Subscriber List:
            </Typography>

            <Paper elevation={4} className="adminPaper" >
              <Grid>
                <TableContainer sx={{ maxHeight: 470 }}>
                  <Table
                    className="tableMain"
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        {/* <TableCell className={classes.tableHeaderCell}>
                          Name
                        </TableCell> */}
                        <TableCell className={classes.tableHeaderCell}>
                          Email
                        </TableCell>
                        {/* <TableCell className={classes.tableHeaderCell}>
                          Zip Code
                        </TableCell> */}
                        <TableCell className={classes.tableHeaderCell}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="adminTableBody">
                      {subs.length > 0 ? (
                        subs[0].map((item) => (
                          <TableRow
                            key={item.id}
                            className={classes.tableBodyRow}
                          >
                            {/* <TableCell className={classes.tableCell}>
                              {item.full_name}
                            </TableCell> */}
                            <TableCell className={classes.tableCell}>
                              {item.email_address}
                            </TableCell>

                            {/* <TableCell className={classes.tableCell}>
                              {item.merge_fields.ADDRESS.zip}
                            </TableCell> */}

                            <TableCell className={classes.tableCell}>
                              {item.status}

                              <IconButton
                              onClick={() =>
                                toggleSubStatus(item.status, item.contact_id)
                              }
                            >
                              <ToggleOffIcon />
                            </IconButton>


                            </TableCell>
                            
                          </TableRow>
                        ))
                      ) : (
                        <img src="./images/Pendulum.gif" />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Paper>
        
          </div>









        </div>
      </Container>
    </div>
  );
};

export default AdminHub;
