import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';

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
    const [ products, setProducts ] = useState([]);
    const [ product, setProduct ] = useState(null);

    const history = useNavigate();

    const handleChangeStock = ( event, value ) => {
        setProduct(value);
        if(value != null){
            switch(value.productType){
                case 0:
                    history.push(`/index/${value.productCode}`);
                    break;
                case 1:
                    history.push(`/stock/${value.productCode}`);
                    break;
                case 2:
                    break;
                default:
            }
        }
    }

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/products`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>{
                    let products = [];
                    products = products.concat(data.filter((product)=>product.productType===0)
                        .map((product)=>{
                            product.productTypeName = "指數";
                            return product;
                        }));
                    products = products.concat(data.filter((product)=>product.productType===0)
                        .map((product)=>{
                            product.productTypeName = "股票";
                            return product;
                        }));
                    setProducts(products)
                });
        }
        fetchData();
    }, [])

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
                options={products.sort((product1, product2)=>product1.productType - product2.productType)}
                groupBy={(product)=>product.productTypeName}
                getOptionLabel={(product)=>product.productCode + " " + product.productName}
                value={product}
                onChange={handleChangeStock}
                autoHighlight
                selectOnFocus
                renderInput={((params)=>{
                    return (<TextField
                    {...params}
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