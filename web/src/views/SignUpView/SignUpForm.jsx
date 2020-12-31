import { Box, Button, Link, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { notificationAction } from '../../actions';

const SignUpView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = ( values, { setSubmitting } ) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password
      })
    };
    setSubmitting(true);
    fetch(`/api/signup`, requestOptions)
      .then((res)=>{
        if (!res.ok) {
          throw res;
        }
      }).then(()=>{
        dispatch(notificationAction.enqueueSuccess("註冊成功，請使用帳號及密碼登入"));
        navigate('/login');
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
      })
      .finally(()=>setSubmitting(false));
  }

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: ''
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('請輸入email').max(255).required('請輸入email'),
          firstName: Yup.string().max(255).required('請輸入名字'),
          lastName: Yup.string().max(255).required('請輸入姓氏'),
          password: Yup.string().max(255).required('請輸入密碼'),
        })
      }
      onSubmit={signUp}>
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
              建立帳號
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2">
              使用Email建立
            </Typography>
          </Box>
          <TextField
            error={Boolean(touched.firstName && errors.firstName)}
            fullWidth
            helperText={touched.firstName && errors.firstName}
            label="名字"
            margin="normal"
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.lastName && errors.lastName)}
            fullWidth
            helperText={touched.lastName && errors.lastName}
            label="姓氏"
            margin="normal"
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            variant="outlined"
          />
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
              註冊
            </Button>
          </Box>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            已有帳號？
            {' '}
            <Link
              component={RouterLink}
              to="/login"
              variant="h6"
            >
              登入
            </Link>
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default SignUpView;