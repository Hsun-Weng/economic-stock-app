import React, { useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import SearchBar from './SearchBar';
import { IconButton, Popover } from '@material-ui/core';

const SearchButton = () => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    return (
        <>
            <IconButton color="inherit" onClick={e=>setAnchorEl(e.currentTarget)}>
                <SearchIcon />
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={e=>setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <SearchBar handleClose={e=>setAnchorEl(null)}/>
            </Popover>
        </>
    )
}

export default SearchButton;
