import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText, ListSubheader} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const UserListItems = () => {
  const classes = useStyles();
  const LinkBehavior = React.forwardRef((props, ref) => (
    <Link ref={ref} to="/" {...props} />
  ));
  const location = useLocation();
  const isSelected = (routePath) => {
    return location.pathname === routePath;
  }

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  
  return (
    <div>
      {user &&
        <div>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
          </ListItem>
        </div>
      }
    </div>)
}

export default UserListItems;