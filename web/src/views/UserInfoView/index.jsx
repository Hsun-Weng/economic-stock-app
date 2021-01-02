import { Grid, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import UserInfoForm from './UserInfoForm';
import PasswordForm from './PasswordForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserInfoView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="基本資料變更">
      <Container maxWidth={false }>
        <Grid
            container
            spacing={3}>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}>
            <UserInfoForm />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}>
            <PasswordForm />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default UserInfoView;