import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

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

  const user = useSelector(state => state.user.data);

  const listItem = ( prop, key ) => {
    if(prop.itemType === 0){
      return (
        <ListItem button 
          component={LinkBehavior} 
          to={prop.path}
          selected={isSelected(prop.path)}
          key={key}>
          <ListItemText primary={prop.itemName} />
        </ListItem>
      )
    }else if (prop.itemType === 1){
      const _children = prop.children;
      return (
        <FoldListItem key={key} groupName={prop.itemName} >
          {_children.map((item, itemKey)=>{
            return (
              <ListItem button 
                component={LinkBehavior} 
                to={item.path}
                selected={isSelected(item.path)}
                key={itemKey}
                className={classes.nested}
                >
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