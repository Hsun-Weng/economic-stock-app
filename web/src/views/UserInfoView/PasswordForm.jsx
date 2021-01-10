import { Box, Button, Card, CardContent, CardHeader, makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { notificationAction } from '../../actions';

const useStyles = makeStyles(() => ({
  root: {}
}));
  
const PasswordForm = ({ className, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const update = ( values, { setSubmitting } ) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: values.password,
                newPassword: values.newPassword })
        };
        setSubmitting(true);
        fetch(`/api/user/password`, requestOptions)
          .then(res=>{
            if(!res.ok){
                throw res;
            }
          })
          .then(()=>{
            dispatch(notificationAction.enqueueSuccess("變更成功"));
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
        }).finally(()=>setSubmitting(false));
    }

    return (
        <Card className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="變更密碼" />
            <CardContent>
                <Formik
                    initialValues={{ password: '', newPassword: '', confirmPassword: '' }}
                    validationSchema={Yup.object().shape({
                        password: Yup.string().required('請輸入密碼'),
                        newPassword: Yup.string()
                            .notOneOf([Yup.ref('password')], '新密碼不得與密碼相同')
                            .required('請輸入新密碼'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword')], '與新密碼不相符')
                            .required('請再次輸入新密碼'),
                    })}
                    onSubmit={update}>
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
                        <TextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="密碼"
                            margin="normal"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.password}
                            variant="outlined" />
                        <TextField
                            error={Boolean(touched.newPassword && errors.newPassword)}
                            fullWidth
                            helperText={touched.newPassword && errors.newPassword}
                            label="新密碼"
                            margin="normal"
                            name="newPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.newPassword}
                            variant="outlined" />
                        <TextField
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            fullWidth
                            helperText={touched.confirmPassword && errors.confirmPassword}
                            label="新密碼"
                            margin="normal"
                            name="confirmPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.confirmPassword}
                            variant="outlined" />
                        <Box my={2}>
                            <Button
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained">
                                變更
                            </Button>
                        </Box>
                    </form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}
  
export default PasswordForm;