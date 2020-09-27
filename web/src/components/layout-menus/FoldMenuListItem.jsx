import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const FoldMenuListItem = ( props ) => {
    const childComponents = React.Children.toArray(props.children)

    const [ open, setOpen ] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={props.groupName} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {childComponents}
                </List>
            </Collapse>
        </div>
    )
}

export default FoldMenuListItem;