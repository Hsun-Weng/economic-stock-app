import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.dark,
    }
}));

const SearchBar = ({ handleClose }) => {
    const classes = useStyles();
    const [ products, setProducts ] = useState([]);

    const navigate = useNavigate();

    const redirectView = ( event, value ) => {
        if(value != null){
            switch(value.productType){
                case 0:
                    navigate(`/stock/index/${value.productCode}`);
                    break;
                case 1:
                    navigate(`/stock/${value.productCode}`);
                    break;
                case 2:
                    break;
                default:
            }
        }
        handleClose();
    }

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/products`)
                .then((res)=>res.json())
                .then((data)=>{
                    let products =  data.map((product)=>{
                        let productTypeName = "";
                        switch(product.productType){
                            case 0:
                                productTypeName = "指數"
                                break;
                            case 1:
                                productTypeName = "股票"
                                break;
                            default:
                        }
                        return {
                            productCode: product.productCode,
                            productName: product.productName,
                            productType: product.productType,
                            productTypeName: productTypeName
                        };
                    });
                    setProducts(products)
                });
        }
        fetchData();
    }, [])

    return (
        <Box minWidth={250} className={classes.search}>
            <Autocomplete
                options={products.sort((product1, product2)=>product1.productType - product2.productType)}
                groupBy={(product)=>product.productTypeName}
                getOptionLabel={(product)=>product.productCode + " " + product.productName}
                onChange={redirectView}
                autoHighlight
                selectOnFocus
                fullWidth
                renderInput={((params)=>{
                    return (<TextField {...params} label={"代號/名稱"} />)}
                )}
            />
        </Box>
    );
}

export default SearchBar;