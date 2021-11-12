import React, { useState } from "react";
import "./Modal.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { TextField, Grid } from "@mui/material/";

function Modal({ closeModal }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userZip, setUserZip] = useState("");



    // new subscriber admin post!
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
    
      };
    


//   const [info, setInfo] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     address: {
//       addr1: "modal test addr",
//       city: "modal test city",
//       state: "modal test STATE",
//       // zip: ''
//     },
//   });

//   const setSubscriberInfo = (propertyName) => (event) => {
//     console.log("what is propertyName", propertyName);
//     console.log("what is event.target.value", event.target.value);
//     setInfo({ ...info, [propertyName]: event.target.value });
//   };

//   const submitFormToMailchimp = (event) => {
//     const objectToSend = {
//       email: info.email,
//       firstName: info.firstName,
//       lastName: info.lastName,
//       address: {
//         addr1: "modal test addr",
//         city: "modal test city",
//         state: "modal test STATE",
//         zip: userZip,
//       },
//     };

//     event.preventDefault();
//     console.log("in submit to mailchimp:", info);
//     dispatch({
//       type: "ADD_SUBSCRIBER",
//       payload: objectToSend,
//     });
//   };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="title">
          <p>
            Minnesota Marketing Careers is a weekly email update dedicated to
            sharing marketing, communications and digital career opportunities
            with Minnesota-based companies. Remote positions also included.
          </p>
        </div>
        <div className="body">
          <form className="subcribe-form" onSubmit={() => submitForm()}>
            <TextField
              id="firstName"
              type="text"
              label="First name"
              variant="outlined"
              value={userFirstName}

              onChange={(event) => setUserFirstName(event.target.value)}
            />
            <TextField
              id="lastName"
              label="Last name"
              variant="outlined"
              value={userLastName}

              onChange={(event) => setUserLastName(event.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              value={userEmail}

              onChange={(event) => setUserEmail(event.target.value)}
            />
            <TextField
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
          {/* <TextField
                        type="text"
                        id="first-name"
                        variant="standard"
                        placeholder="first name"
                        onChange={setSubscriberInfo('first_name')}
                        value={subscriberInfo.first_name} ></TextField> */}
          {/* <TextField
                        type="text"
                        id="poster-name"
                        variant="standard"
                        placeholder="last name"
                        className="poster-name"
                        onChange={setSubscriberInfo('last_name')}
                        value={subscriberInfo.last_name} ></TextField>
                    <TextField
                        type="text"
                        id="poster-name"
                        variant="standard"
                        placeholder="email address"
                        className="poster-name"
                        onChange={setSubscriberInfo('email')}
                        value={subscriberInfo.email} ></TextField>
                    <TextField
                        type="text"
                        id="poster-name"
                        variant="standard"
                        placeholder="Zip code"
                        className="poster-name"
                        onChange={setSubscriberInfo('zip')}
                        value={subscriberInfo.zip} ></TextField> */}
        </div>
        <div className="footer">
          <button>Subscribe</button>
          <button>another button</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
