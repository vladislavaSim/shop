import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {CCartItem} from "./CartItem";
import Button from "@mui/material/Button";
import {actionClearCart, actionFullNewOrder} from "../../redux/actions/actionsCart";

const CartForm = ({cart, clearAll, makeOrder, newOrder, handleClose}) => {
    const [goods, setGoods] = useState(Object.values(cart))

    let sum = goods.length ? goods.map(item => item.good.price * item.count).reduce((a, c) => a += c) : 0

    useEffect(() => {
       setGoods(Object.values(cart))
    }, [cart])

//auto closing cart modal window after making order succeed
    useEffect(() => {
        if(newOrder.status === 'RESOLVED') {
            handleClose()
        }
    }, [newOrder])

    function makeOrderNew(goods) {
        return Object.entries(goods).map((item) => {
            const _id = item[1].good._id;
            const count = item[1].count;
            return { good: { _id }, count }
        })
    }

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
                        onClick={() => makeOrder(makeOrderNew(goods))}
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
    cart: state?.cart,
    newOrder: state?.promise?.newOrder
}), {
    clearAll: actionClearCart,
    makeOrder: actionFullNewOrder
})(CartForm)