import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {queryAllGoods} from "../graphQL/getGoodsQuery";
import {store} from "../redux/store";
import GoodCard from "../components/GoodCard";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const AllGoods = ({getAll, allGoods}) => {
    const [goods, setGoods] = useState(null)
    const [sortedBy, setSortedBy] = useState('low')

    const dispatch = useDispatch()

    function sortGoods(value) {
        console.log(value)
        setSortedBy(value)
        setGoods(goods.sort((a, b) => value === 'low' ? a.price - b.price : b.price - a.price))
    }

    useEffect(() => {
        dispatch(() => getAll())
    }, [])

    useEffect(() => {
        setGoods(allGoods)
        console.log(goods)
    }, [allGoods])

    // console.log(store?.getState())
    return (
       <>
           <FormControl fullWidth style={{width: '300px'}}>
               <InputLabel id="demo-simple-select-label">Sort</InputLabel>
               <Select
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={sortedBy}
                   label="sort"
                   onChange={(e) => sortGoods(e.target.value)}
               >
                   <MenuItem value={'low'}>By low price</MenuItem>
                   <MenuItem value={'high price'}>By high price</MenuItem>
               </Select>
           </FormControl>

           <div className='card-holder'>
               {goods &&
               goods.map(({_id, name, price, description, images}) => {
                   return <GoodCard key={_id} name={name} images={images} price={price} description={description} _id={_id}/>
               })
               }
           </div>
       </>
    );
};

export const CAllGoods = connect((state) => ({
    allGoods: state?.promise?.allGoods?.payload
}),
    {getAll: queryAllGoods})
(AllGoods)