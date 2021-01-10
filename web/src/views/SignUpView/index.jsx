import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import SingUpForm from './SignUpForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SignUpView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
            <SingUpForm />
        </Container>
      </Box>
    </Page>
  );
};

export default SignUpView;