import React from 'react';
import OrderInfo from "./OrderInfo";

const OrdersList = ({orders}) => {
    console.log(orders)
    return (
        <>
            <div className='order-box'>
                <div>total</div>
                <div>date</div>
                <div>goods</div>
            </div>
            {orders.map(({total, _id, createdAt, orderGoods}) => {
                return <OrderInfo
                    total={total}
                    key={_id}
                    createdAt={createdAt}
                    goods={orderGoods}/>
            })}
        </>
    );
};

export default OrdersList;