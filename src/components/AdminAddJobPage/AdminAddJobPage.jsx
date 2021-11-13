import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button, Paper, TextField, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useHistory } from "react-router";
import useStyles from "../Styles/Styles";

const AdminAddJobPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    // const rows = useSelector((store) => store.setJobsReducer);
    const [companyName, setCompanyName] = useState('');
    const [availableRole, setAvailableRole] = useState('');
    const [description, setDescription] = useState('');
    const [applicationLink, setApplicationLink] = useState('');
    const [jobCity, setJobCity] = useState('');
    const [jobState, setJobState] = useState('');
    const [remote, setRemote] = useState('');
    const [postingContactName, setPostingContactName] = useState('');
    const [postingContactEmail, setPostingContactEmail] = useState('');
    const [status, setStatus] = useState('APPROVED');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('the event is', event);
        dispatch({
            type: 'NEW_EMPLOYER_JOB_POST',
            payload: {
                company_name: companyName,
                available_role: availableRole,
                description: description,
                application_link: applicationLink,
                job_city: jobCity,
                job_state: jobState,
                remote: remote,
                posting_contact_name: postingContactName,
                posting_contact_email: postingContactEmail,
                // add post contact info?
                status: status

            }
        })
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
              />
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
              <TextField
                value={remote}
                type="text"
                id="state"
                size="small"
                placeholder="Remote?"
                style={{ width: "200px" }}
                onChange={(event) => setRemote(event.target.value)}
              />
              <br />
              <TextField
                value={postingContactName}
                type="text"
                id="state"
                size="small"
                placeholder="Posting Contact Name"
                style={{ width: "200px" }}
                onChange={(event) => setPostingContactName(event.target.value)}
              />
              <br />
              <TextField
                value={postingContactEmail}
                type="text"
                id="state"
                size="small"
                placeholder="Posting Contact Email"
                style={{ width: "200px" }}
                onChange={(event) => setPostingContactEmail(event.target.value)}
              />
              <br />
              <Button onClick={handleSubmit} className={classes.adminSubmitButton} variant="contained" type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </Container> 
        </div>
    );
};

export default AdminAddJobPage;