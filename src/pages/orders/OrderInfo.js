import React from 'react';
import {getDate} from "../../DateFormating";
import GoodBriefInfo from "../../components/GoodBriefInfo";

const OrderInfo = ({total, createdAt, goods}) => {

    return (
        <div className='order-box'>
            <p>{total} UAH</p>
            <p>{getDate(createdAt)}</p>
            {goods.map(item => {
                return <GoodBriefInfo count={item.count} key={Math.random() * 10000} good={item.good}/>
            })}
        </div>
    );
};

export default OrderInfo;