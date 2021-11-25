import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import useStyles from "../Styles/Styles";

//for password visibility:
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  // for showing password on icon click
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const fillForm = (event) => {
    event.preventDefault();
    setUsername('chicken@proth.com');
    setPassword('cuck-AAHcuck-AAHH');
  }

  return (
    <Paper elevation={6} className={classes.loginRegisterPaper}>
      <form onSubmit={login}>
        <Typography className={classes.loginHeaderText} style={{ marginBottom: "30px" }}>
          LOGIN
        </Typography>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}

        <div className={classes.loginRegisterSpacing}>
          <TextField
                      className={classes.loginTextField}

            required
            type="email"
            id="login-username"
            label="Username"
            variant="outlined"
            size="small"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className={classes.loginRegisterSpacing}>
          <label htmlFor="password">
            <TextField
            className={classes.loginTextField}
              required
              type="password"
              id="login-password"
              label="Password"
              name="password"
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
          </label>
        </div>
        <div>
          <Button
            className={classes.loginButton}
            type="submit"
            color="primary"
            name="submit"
            variant="contained"
            size="small"
            value="Log In"
          >
            GO
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default LoginForm;
