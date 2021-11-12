import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button, Paper, TextField, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router";

const AdminAddJobPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [availableRole, setAvailableRole] = useState('');
    const [description, setDescription] = useState('');
    const [applicationLink, setApplicationLink] = useState('');
    const [jobCity, setJobCity] = useState('');
    const [jobState, setJobState] = useState('');
    const [remote, setRemote] = useState('no');
    const [shareContact, setShareContact] = useState(FALSE);

    return (
        <div className="adminHubPage">
      <Typography style={{fontSize: '40px', margin: 30}}className={classes.adminHeader}>Hi, {user.first_name}!</Typography>

      <Container className="adminContainer">
        <div className="gridWrapper">
          <div className="gridL">
            <Typography variant="h4">Manual Subscriber Entry</Typography>
            <form onSubmit={() => validateEmail()}>
              <TextField
                value={userEmail}
                type="email"
                id="email"
                size="small"
                placeholder="Email"
                style={{ width: "200px" }}
                onChange={(event) => setUserEmail(event.target.value)}
              />{" "}
              <br />
              <TextField
                value={userFirstName}
                type="text"
                id="firstName"
                size="small"
                placeholder="First Name"
                style={{ width: "200px" }}
                onChange={(event) => setUserFirstName(event.target.value)}
              />
              <br />
              <TextField
                value={userLastName}
                type="text"
                id="lastName"
                size="small"
                placeholder="Last Name"
                style={{ width: "200px" }}
                onChange={(event) => setUserLastName(event.target.value)}
              />
              <br />
              <TextField
                value={userZip}
                type="text"
                id="email"
                size="small"
                placeholder="Zip Code"
                style={{ width: "200px" }}
                onChange={(event) => setUserZip(event.target.value)}
              />
              <br />
              <Button className={classes.adminSubmitButton} variant="contained" type="submit">Submit</Button>
            </form>
          </div>

          <div className="gridR">
            <Typography
              variant="h4"
              style={{ margin: "20px", textDecoration: "underline" }}
            >
              Full Subscriber List:
            </Typography>

            <Paper elevation={8} className="adminPaper">
              <TableContainer sx={{ maxHeight: 470 }}>
              <Table className="tableMain" stickyHeader aria-label="sticky table">
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell
                      className={classes.tableHeaderCell}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                    >
                      Zip Code
                       </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="adminTableBody">
                  {subs.length > 0 ? (
                    subs[0].map((item) => (
                      <TableRow key={item.id} className={classes.tableBodyRow}>
                        <TableCell
                          style={{
                          
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.full_name}
                        </TableCell>
                        <TableCell
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.email_address}
                        </TableCell>


                        <TableCell
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.merge_fields.ADDRESS.zip}
                        </TableCell>



                        <TableCell 
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.status}
                        </TableCell>
                        <IconButton onClick={() => toggleSubStatus(item.status, item.contact_id)}><ToggleOffIcon/></IconButton>
                      </TableRow>
                    ))
                  ) : (
                    <img src="./images/Pendulum.gif" />
                  )}
                </TableBody>
              </Table>
              </TableContainer>
            </Paper>
            <Typography></Typography>
          </div>
        </div>
      </Container>
    </div>
    );
};

export default AdminAddJobPage;