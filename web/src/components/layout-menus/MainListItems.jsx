import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link, useLocation} from 'react-router-dom'

import { mainItemRoutes } from '../../Routes';
import FoldListItem from './FoldMenuListItem';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const MainListItems = () => {
  const classes = useStyles();
  const LinkBehavior = React.forwardRef((props, ref) => (
    <Link ref={ref} to="/" {...props} />
  ));
  const location = useLocation();
  const isSelected = (routePath) => {
    return location.pathname === routePath;
  }
  return (
    <div>
      {mainItemRoutes.map((prop, key) => {
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
        return (<div />);
      })}
    </div>
  )
}

export default MainListItems;