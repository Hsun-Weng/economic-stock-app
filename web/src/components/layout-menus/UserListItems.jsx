import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { userItemRoutes } from '../../Routes';
import FoldListItem from './FoldMenuListItem';

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

  const user = useSelector(state => state.user.user);

  const listItem = ( prop, key ) => {
    if(prop.itemType === 0){
      return (
        <ListItem button 
          component={LinkBehavior} 
          to={prop.path}
          selected={isSelected(prop.path)}
          key={key}>
          <ListItemIcon>
            <prop.icon />
          </ListItemIcon>
          <ListItemText primary={prop.itemName} />
        </ListItem>
      )
    }else if (prop.itemType === 1){
      const _children = prop.children;
      return (
        <FoldListItem key={key} groupName={prop.itemName} groupIcon={prop.icon}>
          {_children.map((item, itemKey)=>{
            return (
              <ListItem button 
                component={LinkBehavior} 
                to={item.path}
                selected={isSelected(item.path)}
                key={itemKey}
                className={classes.nested}
                >
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.itemName} />
              </ListItem>);
          })}
        </FoldListItem>
      )
    }
  }
  
  return (
    <div>
        {user ? 
          <div>
            {userItemRoutes.map((prop, key) => listItem(prop, key))}
          </div>
          :<div />
        }
    </div>)
}

export default UserListItems;