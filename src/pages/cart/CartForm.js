import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {CCartItem} from "./CartItem";
import {CGoodCard} from "../../components/GoodCard";
import Button from "@mui/material/Button";

const CartForm = ({cart}) => {
    const [goods, setGoods] = useState(Object.values(cart))
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
                })}
            {goods.length ? <Button style={{alignSelf: 'self-end', marginTop: '20px'}} color='success' variant='contained'>Make an order</Button> : <h4>Let's order something</h4>}
        </div>
    );
};

export const CCartForm = connect((state) => ({
    cart: state?.cart
}), {

})(CartForm)