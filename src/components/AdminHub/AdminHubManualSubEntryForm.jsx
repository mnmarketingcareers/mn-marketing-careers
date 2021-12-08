import { useState } from "react";
import { useDispatch } from "react-redux";


import { Typography, TextField, Button } from "@mui/material";
import useStyles from "../Styles/Styles"; //important paste this

const AdminHubManualSubEntryForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    
  //manual user entry info
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userZip, setUserZip] = useState("");


  return (
    <div>
      <div>
        <Typography variant="h4" className={classes.subEntryHeader}>
          Manual Subscriber Entry
        </Typography>
        <form onSubmit={() => validateEmail()}>
          <TextField
            value={userEmail}
            type="email"
            id="email"
            size="small"
            placeholder="Email"
            style={{ width: "200px", margin: "4px" }}
            onChange={(event) => setUserEmail(event.target.value)}
          />{" "}
          <br />
          <TextField
            value={userFirstName}
            type="text"
            id="firstName"
            size="small"
            placeholder="First Name"
            style={{ width: "200px", margin: "4px" }}
            onChange={(event) => setUserFirstName(event.target.value)}
          />
          <br />
          <TextField
            value={userLastName}
            type="text"
            id="lastName"
            size="small"
            placeholder="Last Name"
            style={{ width: "200px", margin: "4px" }}
            onChange={(event) => setUserLastName(event.target.value)}
          />
          <br />
          <TextField
            value={userZip}
            type="text"
            id="email"
            size="small"
            placeholder="Zip Code"
            style={{ width: "200px", margin: "4px" }}
            onChange={(event) => setUserZip(event.target.value)}
          />
          <br />
          <Button style={{ margin: "15px" }} variant="contained" type="submit">
            Submit
          </Button>
        </form>
        <br />
      </div>
    </div>
  );
};

export default AdminHubManualSubEntryForm;
