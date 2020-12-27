import { AppBar, Badge, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
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