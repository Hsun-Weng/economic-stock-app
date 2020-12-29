import { Box, Button, Grid, Link, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { userAction, notificationAction } from '../../actions';
import config from '../../config';
import FacebookIcon from '../../icons/Facebook';

const LoginForm = () => {
    const dispatch = useDispatch();

    const authorizationEndpoint = config.oauth.facebook.authorizationEndpoint;
    const clientId = config.oauth.facebook.clientId;
    const redirectUri = config.oauth.facebook.redirectUri;
    const scopes = config.oauth.facebook.scopes;

    const redirectUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&display=page&response_type=code&scopes=${scopes}`;

    const login = ({ values }) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: values.email,
                password: values.password })
        };
        fetch(`/api/user/login`, requestOptions)
          .then(res=>{
            if(!res.ok){
                throw Error(res.text());
            }
          })
          .then(()=>dispatch(userAction.getUser()))
          .catch(errText=>{
            dispatch(notificationAction.enqueueError(errText));
          })
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('請輸入email').max(255).required('請輸入email'),
              password: Yup.string().max(255).required('請輸入密碼')
            })}
            onSubmit={login}>
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2">
                    登入
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2">
                    授權登入
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}>
                  <Grid
                    item
                    xs={12}
                    md={6}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      size="large"
                      variant="contained"
                      href={redirectUrl}>
                      以Facebook登入
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}>
                    <Button
                      fullWidth
                    //   startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained">
                      以Google登入
                    </Button>
                  </Grid>
                </Grid>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    登入
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1">
                  尚未有帳戶？
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6">
                    註冊
                  </Link>
                </Typography>
              </form>
            )}
        </Formik>
    )
}

export default LoginForm;