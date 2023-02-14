import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {queryAllGoods} from "../graphQL/getGoodsQuery";
import {store} from "../redux/store";

const AllGoods = ({getAll, allGoods}) => {
    const [goods, setGoods] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(() => getAll())
    }, [])

    useEffect(() => {
        setGoods(allGoods)
    }, [allGoods])


    return (
        <div>
            {goods &&
                goods.map((good) => {
                    return <div key={good?._id}>{good?.name}</div>
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