import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {queryAllGoods} from "../graphQL/getGoodsQuery";
import {store} from "../redux/store";
import GoodCard from "../components/GoodCard";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const AllGoods = ({getAll, allGoods}) => {
    const [goods, setGoods] = useState(null)
    const [sortedBy, setSortedBy] = useState('old')

    const dispatch = useDispatch()

    function sortGoods(value) {
        console.log(value)
        setSortedBy(value)
        console.log(sortedBy)
        if(value === 'low' || value === 'high') {
            console.log('by price')
            setGoods(goods.sort((a, b) => value === 'low' ? a.price - b.price : b.price - a.price))
        } else if(value === 'old' || value === 'new') {
            console.log('by time')
            setGoods(goods.sort((a, b) => value === 'old' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt))
        } else {
            return null
        }
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
                   <MenuItem value={'old'}>From oldest</MenuItem>
                   <MenuItem value={'new'}>From newest</MenuItem>
                   <MenuItem value={'low'}>By low price</MenuItem>
                   <MenuItem value={'high'}>By high price</MenuItem>
               </Select>
           </FormControl>

           <div className='card-holder'>
               {goods &&
               goods.map(({_id, name, price, description, images, createdAt}) => {
                   return <GoodCard key={_id} name={name} images={images} price={price} description={description} _id={_id} createdAt={createdAt}/>
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