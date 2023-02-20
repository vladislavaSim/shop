import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {CCartItem} from "./CartItem";
import Button from "@mui/material/Button";
import {actionClearCart} from "../../redux/actions/actionsCart";

const CartForm = ({cart, clearAll}) => {
    const [goods, setGoods] = useState(Object.values(cart))
    let sum = goods.length ? goods.map(item => item.good.price * item.count).reduce((a, c) => a += c) : 0
    console.log(cart)
    console.log(goods)

    useEffect(() => {
       setGoods(Object.values(cart))
    }, [cart])

    return (
        <div className='cart-box'>
            <h4>Cart</h4>
            {goods && goods.map(({good, count}) => {
                    return <CCartItem good={good} count={count} key={Math.random() * 10000}/>
                })
            }
            {goods.length ?
                <div>
                    <div>`Total: ${sum ? sum : 0}`</div>
                    <Button
                        style={{alignSelf: 'self-end', margin: '20px 20px 0 0'}}
                        color='success'
                        variant='contained'>
                        Make an order
                    </Button>
                    <Button
                        onClick={() => clearAll()}
                        style={{alignSelf: 'self-end', marginTop: '20px'}}
                        variant='text'>
                        clear all
                    </Button>
                </div>
                : <h4>Let's order something</h4>}
        </div>
    );
};

export const CCartForm = connect((state) => ({
    cart: state?.cart
}), {
    clearAll: actionClearCart
})(CartForm)