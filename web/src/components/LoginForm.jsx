import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, CircularProgress, Box, Typography, Container, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { authActions } from '../actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const [ userName, setUserName ] = useState("");
  const [ password, setPassword ] = useState("");

  const loggingIn = useSelector(state => state.auth.loggingIn);
  const loginError = useSelector(state => state.auth.error);

  const dispatch = useDispatch();

  const handleSubmit = ( event ) => {
    event.preventDefault();
    dispatch(authActions.login(userName, password));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loginError ?
        <Alert severity="error">{loginError.message}</Alert>
        :<div/>
      }
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User Name"
            name="userName"
            value={userName}
            onChange={event=>setUserName(event.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={event=>setPassword(event.target.value)}
          />
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              {loggingIn? <CircularProgress size={24} />:
              <Typography>Sign In</Typography>}
            </Button>
          </div>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}