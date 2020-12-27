import { Box, Button, Checkbox, FormHelperText, Link, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

const SignUpView = () => {
  const signUp = ( values ) => {
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

    fetch(`/api/user/signup`, requestOptions)
      .then(res=>res.json());
  }

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        policy: false
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('請輸入email').max(255).required('請輸入email'),
          firstName: Yup.string().max(255).required('請輸入名字'),
          lastName: Yup.string().max(255).required('請輸入姓氏'),
          password: Yup.string().max(255).required('請輸入密碼'),
          policy: Yup.boolean().oneOf([true], '請勾選')
        })
      }
      onSubmit={() => signUp}>
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
          <Box
            alignItems="center"
            display="flex"
            ml={-1}
          >
            <Checkbox
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body1"
            >
              I have read the
              {' '}
              <Link
                color="primary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
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