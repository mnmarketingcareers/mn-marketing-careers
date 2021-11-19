import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, TextField, Button, IconButton, InputAdornment } from '@material-ui/core';
import useStyles from '../Styles/Styles';

//for password visibility:
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import ReCaptchaV2 from 'react-google-recaptcha';


function RegisterForm() {
const classes = useStyles(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [token, setToken] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    // Sends new user information to server via saga route 'REGISTER'
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        token: token,
      },
    });
  }; // end registerUser

// for showing password on icon click
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // Recaptcha handlers
  const [showButton, setShowButton] = useState(false);
  // let showButton = lasagna.success ? true : false;
  /**
   * Adds the token to the form object
   *
   * @param {string} token - response from ReCaptcha
   */
  const handleToken = (token) => {
    console.log('recaptcha token: ', token);
    // dispatch({ type: 'LASAGNA', payload: token });
    setShowButton(true);
    setToken(token);
  }

  /**
   * Removes the token from the from object
   */
  const handleExpire = () => {
    dispatch({ type: 'RESET_LASAGNA' });
    console.log('showbutton is: ', showButton);
    setShowButton(false);
    console.log('showButton is: ', showButton);
    setToken( null );
  }

  return (
    <Paper className={classes.loginRegisterPaper}  elevation={6}>

    <form onSubmit={registerUser}>
    <Typography  className={classes.loginHeaderText} style={{marginBottom: '30px'}}>REGISTER</Typography> 
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}



      <div className={classes.loginRegisterSpacing}>

      <TextField 
                  className={classes.loginTextField}

        required            
        type="email"
        id="register-username"
        label="Email"
        variant="outlined"
        size="small"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        />
</div >
<div className={classes.loginRegisterSpacing}>
<TextField 
            className={classes.loginTextField}

        required            
        type="password"
        id="register-password"
        label="Password"
        variant="outlined"
        size="small"
        value={password}
        type={showPassword ? "text" : "password"}

          onChange={(event) => setPassword(event.target.value)}
          InputProps={{ 
            // This is where the toggle button is added.
            endAdornment: ( 
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

      </div>
      <div className={classes.loginRegisterSpacing}>

      <TextField 
                  className={classes.loginTextField}

        required            
        type="text"
        id="register-first-name"
        label="First Name"
        variant="outlined"
        size="small"
        value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

</div>
      <div className={classes.loginRegisterSpacing}>

      
     

     <TextField 
                 className={classes.loginTextField}

        required      
              
        type="text"
        id="register-last-name"
        label="Last Name"
        variant="outlined"
        size="small"
        value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

      
        </div>
        <div className={classes.recaptchaContainer}>
          {
            !showButton &&
            <ReCaptchaV2 sitekey={(process.env.REACT_APP_SITE_KEY)}
              onChange={handleToken}
              onExpired={handleExpire}
              onErrored={err => console.error(`Recaptcha error: ${err}`)}
            />
          }
          {
            showButton &&
            <Button className={classes.loginButton} type="submit" color="primary" name="submit" variant="contained" size="small" value="Register">GO</Button>
          }
        </div>

      </form>
    </Paper>
  );
}

export default RegisterForm;
