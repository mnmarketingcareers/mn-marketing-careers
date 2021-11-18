import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import useStyles from '../Styles/Styles';


function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (

    <Paper elevation={6} className={classes.loginRegisterPaper} >

    <form 
    onSubmit={login}>
      <Typography variant="h4" style={{marginBottom: '30px'}}>LOGIN</Typography> 
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}




<div  className={classes.loginRegisterSpacing}>

        <TextField 
        required            
        type="email"
        id="login-username"
        label="Username"
        variant="outlined"
        size="small"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        />
</div >
<div className={classes.loginRegisterSpacing}>

<TextField 
        required            
        type="password"
        id="login-password"
        label="Password"
        variant="outlined"
        size="small"
        value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
</div>
      <div>
        <Button className={classes.loginButton} type="submit" color="primary" name="submit" variant="contained" size="small" value="Log In">GO</Button>
      </div>
    </form>
    </Paper>
  );
}

export default LoginForm;
