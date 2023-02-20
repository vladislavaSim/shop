import React, {useEffect, useState} from 'react';
import {CGoodCard} from "../../components/GoodCard";
import {connect} from "react-redux";
import {
    Card,
    CardContent,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Typography
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {actionChangeGoodCount, actionRemoveGood} from "../../redux/actions/actionsCart";
import {Input} from "@mui/icons-material";

const CartItem = ({good, removeItem, changeCount, count}) => {
    const {name, price} = good

    return (
        <div style={{marginBottom: '15px'}}>
            <Card>
                {good && count && <CardContent id='cart-item'>
                    {name && <Typography gutterBottom variant="h6" component="div">
                        {name.length > 40 ? name.slice(0, 40) + '...' : name}
                    </Typography>}
                    {price && <Typography gutterBottom variant="h7" component="div">
                        {price + ' UAH'}
                    </Typography>}
                    {/*<input type='number'/>*/}
                    <input
                        className='styled_input'
                        min={1}
                        value={count}
                        onChange={(e) => changeCount(good, +e.target.value)}
                        type='number'
                    />
                    <IconButton
                        onClick={() => removeItem(good)}
                        color='error'
                        size='large'>
                        <HighlightOffIcon/>
                    </IconButton>
                </CardContent>}
            </Card>
        </div>
    );
};

export const CCartItem = connect(null, {
    removeItem: actionRemoveGood,
    changeCount: actionChangeGoodCount
    }
)(CartItem)