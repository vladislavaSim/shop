import React, {useState} from 'react';
import {CGoodCard} from "../../components/GoodCard";
import {connect} from "react-redux";
import {Card, CardContent, IconButton, Typography} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CartItem = ({good}) => {
    const {name, price} = good
    return (
        <div>
            <Card>
                <CardContent id='cart-item'>
                    { name && <Typography gutterBottom variant="h6" component="div">
                        {name.length > 40 ? name.slice(0, 40) + '...' : name}
                    </Typography>}
                    { price && <Typography gutterBottom variant="h7" component="div">
                        {price + ' UAH'}
                    </Typography>}
                    <input type='number'/>
                    <IconButton
                        color='error'
                        size='large'>
                        <HighlightOffIcon/>
                    </IconButton>
                </CardContent>
            </Card>
        </div>
    );
};

export const CCartItem = connect(
)(CartItem)