import React, { useState } from "react";
import "./Modal.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { TextField, Grid, Button } from "@mui/material/";
import { FaWindowClose } from "react-icons/fa";

//For the snackbar
import useStyles from "../Styles/Styles";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function Modal({ closeModal }) {
  const history = useHistory();
  const dispatch = useDispatch();


  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userZip, setUserZip] = useState("");


  const fillSubscribe = (event) => {
    event.preventDefault();
    setUserEmail('francky-B@proth.com'),
    setUserFirstName('Franck'),
    setUserLastName('Bushbaum'),
    setUserZip('55127')
  } 
    

  const submitForm = () => {
    const userAddress = {
      addr1: "-",
      city: "-",
      state: "-",
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
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">

          <button className="exit-modal" onClick={() => closeModal(false)}><FaWindowClose /></button>
        </div>
        <div className="title">
          <img src="./images/small-circle-logo-only-v2.png" />
          <p>
            Minnesota Marketing Careers is a weekly email update dedicated to
            sharing marketing, communications and digital career opportunities
            with Minnesota-based companies. Remote positions also included.
          </p>
        </div>
        <div className="body">
          <form className="subcribe-form" onSubmit={() => submitForm()}>
            <TextField
              sx={{ m: 1, width: 410 }}
              id="firstName"
              type="text"
              label="First name"
              variant="outlined"
              value={userFirstName}
              onChange={(event) => setUserFirstName(event.target.value)}
            />

            <TextField
              sx={{ m: 1, width: 410 }}
              id="lastName"
              label="Last name"
              variant="outlined"
              value={userLastName}
              onChange={(event) => setUserLastName(event.target.value)}
            />
            <TextField
              sx={{ m: 1, width: 410 }}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
            />

            <TextField
              sx={{ m: 1, width: 410 }}
              id="zip"
              label="Zip Code"
              variant="outlined"
              value={userZip}
              onChange={(event) => setUserZip(event.target.value)}
            />
            <input
              className="submit-subscription-form-button"
              type="submit"
              value="Subscribe"
            />
          </form>
          <Button onClick={fillSubscribe} ></Button>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: '350px' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={Slide}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '350px' }}>
            You've successfully subscribed!
          </Alert>
        </Snackbar>
      </Stack>
    </div>

  );
}

export default Modal;

