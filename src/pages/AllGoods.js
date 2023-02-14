import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {queryAllGoods} from "../graphQL/getGoodsQuery";
import {store} from "../redux/store";
import GoodCard from "../components/GoodCard";

const AllGoods = ({getAll, allGoods}) => {
    const [goods, setGoods] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(() => getAll())
    }, [])

    useEffect(() => {
        setGoods(allGoods)
        console.log(goods)
    }, [allGoods])

    // console.log(store?.getState())
    return (
        <div className='card-holder'>
            {goods &&
                goods.map(({_id, name, price, description, images}) => {
                    return <GoodCard key={_id} name={name} images={images} price={price} description={description} _id={_id}/>
                })
            }
        </div>
    );
};

export const CAllGoods = connect((state) => ({
    allGoods: state?.promise?.allGoods?.payload
}),
    {getAll: queryAllGoods})
(AllGoods)