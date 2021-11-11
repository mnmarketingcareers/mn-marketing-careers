import React, {useState} from 'react'
import './Modal.css';
import { useHistory } from 'react-router';
import { useDispatch} from 'react-redux';
import {TextField, Grid} from '@mui/material/';

function Modal({ closeModal }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const [info, setInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        zip: ''
    });

    const setSubscriberInfo = (propertyName) => (event) => {
        console.log('what is propertyName', propertyName);
        console.log('what is event.target.value', event.target.value);
        setInfo({...info, [propertyName]: event.target.value})
    };

    const submitFormToMailchimp = (event) => {
        event.preventDefault();
        console.log('in submit to mailchimp')
        dispatch({
            type: 'NEW_SUBSCRIPTION_TO_MAILCHIMP',
            payload: info
        })
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className="title">
                    <p>Minnesota Marketing Careers is a weekly email
                        update dedicated to sharing marketing,
                        communications and
                        digital career opportunities with Minnesota-based companies.
                        Remote positions also included.</p>
                </div>
                <div className="body">
                <form className="subcribe-form" onSubmit={submitFormToMailchimp} >
                    <TextField 
                        id="first-name"
                        type="text" 
                        label="First name" 
                        variant="outlined"
                        onChange={setSubscriberInfo('first_name')}
                        value={info.first_name} />
                    <TextField 
                        id="last-name" 
                        label="Last name" 
                        variant="outlined"
                        onChange={setSubscriberInfo('last_name')}
                        value={info.last_name} /> 
                    <TextField 
                        id="email" 
                        label="Email" 
                        variant="outlined"
                        onChange={setSubscriberInfo('email')}
                        value={info.email} />
                    <TextField 
                        id="zip" 
                        label="Zip Code"
                        variant="outlined"
                        onChange={setSubscriberInfo('zip')}
                        value={info.zip} />
                        <input className="submit-subscription-form-button" type='submit' value='Subscribe' />
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
    )
}

export default Modal

