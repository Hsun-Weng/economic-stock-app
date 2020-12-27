import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Badge,
} from '@material-ui/core';
import { Home as HomeIcon } from 'react-feather';

const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}>
      <Toolbar className={classes.toolbar}>
        <IconButton color="inherit" href="/">
            <Badge
                color="primary"
                variant="dot">
                <HomeIcon />
            </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;