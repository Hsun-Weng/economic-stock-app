import { AppBar, Box, Hidden, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import SearchButton from './SearchButton';
import LogoutButton from './LogoutButton';
import DarkModeToggle from '../../components/DarkModeToggle';

const useStyles = makeStyles(() => ({
  root: {},
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton
              color="inherit"
              onClick={onMobileNavOpen}>
              <MenuIcon />
          </IconButton>
        </Hidden>
        <Box flexGrow={1} />
        <SearchButton />
        <Box flexGrow={1} />
        <DarkModeToggle />
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;