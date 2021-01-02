import { Box, Button, Grid, Link, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { notificationAction, userAction } from '../../actions';
import config from '../../config';
import FacebookIcon from '../../icons/Facebook';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = ( values, { setSubmitting } ) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: values.email,
                password: values.password })
        };
        setSubmitting(true);
        fetch(`/api/login`, requestOptions)
          .then(res=>{
            if(!res.ok){
                throw res;
            }
          })
          .then(()=>{
            dispatch(userAction.getUser());
            navigate("/");
          })
          .catch((err)=>{
            if (err.json) {
              err.json()
              .then(data=> {
                dispatch(notificationAction.enqueueError(data.message))
              })
            } else {
              dispatch(notificationAction.enqueueError("伺服器錯誤，請稍後再試。"))
            }
            setSubmitting(false)
          });
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
                    md={12}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      size="large"
                      variant="contained"
                      href={config.oauth.facebook.authorizationUrl}>
                      以Facebook登入
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