import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, CssBaseline, TextField, Link, CircularProgress, Box, Typography, Container, makeStyles, Divider } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';

import { userAction } from '../actions';

import config from '../config';

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
    marginTop: theme.spacing(1),
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
    margin: theme.spacing(3, 0, 1),
  },
  loginButton: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(0, 2, 3),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));


const FacebookLoginButton = () => {
  const classes = useStyles();

  const authorizationEndpoint = config.oauth.facebook.authorizationEndpoint;
  const clientId = config.oauth.facebook.clientId;
  const redirectUri = config.oauth.facebook.redirectUri;
  const scopes = config.oauth.facebook.scopes;

  const redirectUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&display=page&response_type=code&scopes=${scopes}`
  
  return (
    <Button
      component={Link}
      variant="contained"
      color="primary"
      fullWidth
      className={classes.submit}
      href={redirectUrl}>
      <FacebookIcon />
      Facebook
      </Button>
  )
}
  
export default function LoginForm() {
  const classes = useStyles();
  const [ userName, setUserName ] = useState("");
  const [ password, setPassword ] = useState("");

  const loading = useSelector(state => state.login.loading);

  const dispatch = useDispatch();

  const handleSubmit = ( event ) => {
    event.preventDefault();
    dispatch(userAction.login(userName, password));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={loading}
              className={classes.submit}>
              {loading && <CircularProgress size={24} />}
              <Typography>Sign In</Typography>
            </Button>
            <Typography align="center" >
              or <Link href={"/user/signUp"}>Sign Up</Link>
            </Typography>
          </div>
          <div className={classes.wrapper}>
            <Divider />
            <FacebookLoginButton />
          </div>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}