import { Card, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {}
}));

const SortColumnSelect = ({ sortColumn, onSortColumnChange }) => (
    <FormControl fullWidth margin="normal">
        <InputLabel>排序欄位</InputLabel>
        <Select
            value={sortColumn}
            onChange={onSortColumnChange}>
            <MenuItem value={"volume"}>成交量</MenuItem>
            <MenuItem value={"change_percent"}>價格變化</MenuItem>
        </Select>
    </FormControl>
)
  
const DirectionRadioGroup = ({ direction, onDirectionChange }) => (
    <FormControl fullWidth margin="normal">
        <FormLabel component="legend" >順序</FormLabel>
        <RadioGroup row
        value={direction}
        onChange={onDirectionChange}>
            <FormControlLabel value="ASC" label="升序" control={<Radio />}></FormControlLabel>
            <FormControlLabel value="DESC" label="降序" control={<Radio />}></FormControlLabel>
        </RadioGroup>
    </FormControl>
)

const StockRankSelect = ({ className, sortColumn, direction, onSortColumnChange, onDirectionChange, ...rest }) => {
    const classes = useStyles();

    return (
        <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}>
            <Card>
                <CardHeader title="個股成交排行" />
                <CardContent>
                    <SortColumnSelect sortColumn={sortColumn} onSortColumnChange={onSortColumnChange} />
                    <DirectionRadioGroup direction={direction} onDirectionChange={onDirectionChange} />
                </CardContent>
            </Card>
        </form>
    );
}
  
export default StockRankSelect;