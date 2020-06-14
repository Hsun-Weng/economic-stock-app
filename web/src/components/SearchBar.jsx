import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { InputBase, Box, IconButton, Menu, TextField } from '@material-ui/core'
import { Skeleton, Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import { stockAction } from '../actions';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 2
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        color: 'white',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('md')]: {
        //     width: '20ch',
        // },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const SearchBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allStocks = useSelector(state=> state.stock.allStocks.data);
    
    // const [ stock, setStock ] = useState({stockCode: "2330", stockName: "台積電"});
    const [ stock, setStock ] = useState(null);

    const history = useHistory();

    const handleChangeStock = ( event, value ) => {
        setStock(value);
        if(value != null){
            history.push(`/stock/${value.stockCode}`);
        }
    }

    useEffect(() => {
        dispatch(stockAction.getAllStocks());
    }, [])

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
                options={allStocks}
                getOptionLabel={(stock)=>stock.stockCode + " " + stock.stockName}
                value={stock}
                onChange={handleChangeStock}
                autoHighlight
                selectOnFocus
                renderInput={((params)=>{
                    return (<TextField
                    {...params}
                    // ref={params.inputProps.ref}
                    // inputProps={params.inputProps}
                    // disableUnderline={true}
                    placeholder="Search Stock..."
                    className={classes.inputRoot}
                    inputProps={{
                        ...params.inputProps,
                        className: classes.inputInput,
                    }}
                  />)}
                )}
            />
        </div>
        );
}

export default SearchBar;