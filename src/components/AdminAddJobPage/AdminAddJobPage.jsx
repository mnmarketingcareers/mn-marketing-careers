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
import useStyles from "../Styles/Styles";

const AdminAddJobPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const rows = useSelector((store) => store.setJobsReducer);
    const columns = [
        { field: 'id', headerName: 'id', width: 150 },
        { field: 'available_role', headerName: 'available role', width: 150 },
        { field: 'description', headerName: 'description', width: 150 },
        { field: 'application_link', headerName: 'link', width: 150 },
        { field: 'job_city', headerName: 'city', width: 150 },
        { field: 'job_state', headerName: 'State', width: 150 },
        { field: 'remote', headerName: 'Remote?', width: 150 },
        { field: 'date_posted', headerName: 'date', width: 150 },
        { field: 'hiring_contact_email', headerName: 'Contact Email', width: 150 },
        { field: 'hiring_contact_name', headerName: 'Contact Came', width: 150 },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'company_name', headerName: 'company', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150, },
    ];

    const [availableRole, setAvailableRole] = useState('');
    const [description, setDescription] = useState('');
    const [applicationLink, setApplicationLink] = useState('');
    const [jobCity, setJobCity] = useState('');
    const [jobState, setJobState] = useState('');
    const [remote, setRemote] = useState('no');
    const [shareContact, setShareContact] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('the event is', event);
        dispatch({
            type: 'FETCH_MAIN_JOBS',
            payload: rows
        })
        alert('Successfully added job!')
    }

    // considering having button options for the remote and share contact options
    return (
    <div className="adminAddJobPage">
      <Container className="adminContainer">
        <div className="gridWrapper">
          <div className="gridL">
            <Typography variant="h4">Manual Job Entry</Typography>
            <form onSubmit={() => validateEmail()}>
              <TextField
                value={availableRole}
                type="text"
                id="role"
                size="small"
                placeholder="Role"
                style={{ width: "200px" }}
                onChange={(event) => setAvailableRole(event.target.value)}
              />{" "}
              <br />
              <TextField
                value={description}
                type="text"
                id="description"
                size="small"
                placeholder="Description"
                style={{ width: "200px" }}
                onChange={(event) => setDescription(event.target.value)}
              />
              <br />
              <TextField
                value={applicationLink}
                type="text"
                id="link"
                size="small"
                placeholder="Job Link"
                style={{ width: "200px" }}
                onChange={(event) => setApplicationLink(event.target.value)}
              />
              <br />
              <TextField
                value={jobCity}
                type="text"
                id="city"
                size="small"
                placeholder="City"
                style={{ width: "200px" }}
                onChange={(event) => setJobCity(event.target.value)}
              />
              <br />
              <TextField
                value={jobState}
                type="text"
                id="state"
                size="small"
                placeholder="State"
                style={{ width: "200px" }}
                onChange={(event) => setJobState(event.target.value)}
              />
              <br />
              <Button onClick={handleSubmit} className={classes.adminSubmitButton} variant="contained" type="submit">Submit</Button>
            </form>
          </div>

          <div className="gridR">
            <Typography
              variant="h4"
              style={{ margin: "20px", textDecoration: "underline" }}
            >
              Full Jobs List:
            </Typography>

            <Paper elevation={8} className="adminPaper">
              <TableContainer sx={{ maxHeight: 470 }}>
              <Table className="tableMain" stickyHeader aria-label="sticky table">
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell
                      className={classes.tableHeaderCell}
                    >
                      Role
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                    >
                      Job Link
                       </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                    >
                      City
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                    >
                      State
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody className="adminTableBody">
                  {rows.length > 0 ? (
                    rows[0].map((item) => (
                      <TableRow key={item.id} className={classes.tableBodyRow}>
                        <TableCell
                          style={{
                          
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.available_role}
                        </TableCell>
                        <TableCell
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.description}
                        </TableCell>


                        <TableCell
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.application_link}
                        </TableCell>


                        <TableCell 
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.job_city}
                        </TableCell>
                        <IconButton onClick={() => toggleSubStatus(item.status, item.contact_id)}><ToggleOffIcon/></IconButton>
                      </TableRow>
                    ))
                  ) : (
                    <img src="./images/Pendulum.gif" />
                  )}
                </TableBody> */}
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