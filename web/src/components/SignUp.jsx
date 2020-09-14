  
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, CssBaseline, TextField, Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { userAction } from '../actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [ userName, setUserName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");

  const loading = useSelector(state=>state.signUp.loading);
  
  const handleSubmit = ( event ) => {
    event.preventDefault();
    let user = { userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName}
    dispatch(userAction.signUp(user));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                fullWidth
                label="First Name"
                value={firstName}
                onChange={event=>setFirstName(event.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={event=>setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="EMail"
                value={userName}
                onChange={event=>setUserName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={event=>setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={loading}
            className={classes.submit}>
            {loading && <CircularProgress size={24} />}
            Sign Up
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
}