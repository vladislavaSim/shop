import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {queryAllGoods} from "../graphQL/getGoodsQuery";
import {store} from "../redux/store";
import GoodCard from "../components/GoodCard";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const AllGoods = ({getAll, allGoods, goodsByCat}) => {
    const [goods, setGoods] = useState(null)
    const [sortedBy, setSortedBy] = useState('old')

    const dispatch = useDispatch()

//initial dispatch to get all goods
    useEffect(() => {
        dispatch(() => getAll())
    }, [])

    function sortGoods(value) {
        setSortedBy(value)
        if(value === 'low' || value === 'high') {
            setGoods(goods.sort((a, b) => value === 'low' ? a.price - b.price : b.price - a.price))
        } else if(value === 'old' || value === 'new') {
            setGoods(goods.sort((a, b) => value === 'old' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt))
        } else {
            return null
        }
    }
//goods state update while choosing cats from sidemenu
    useEffect(() => {
       setGoods(goodsByCat)
    }, [goodsByCat])

//initial all goods show
    useEffect(() => {
        setGoods(allGoods)
    }, [allGoods])

    return (
       <div>
           <div className='select-box'>
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
           </div>
           <div>
               <div className='card-holder'>
                   {goods &&
                   goods.map(({_id, name, price, description, images, createdAt}) => {
                       return <GoodCard key={_id} name={name} images={images} price={price} description={description} _id={_id} createdAt={createdAt}/>
                   })
                   }
               </div>
           </div>
       </div>
    );
};

export const CAllGoods = connect((state) => ({
    allGoods: state?.promise?.allGoods?.payload,
    goodsByCat: state?.promise?.goodsByCat?.payload?.goods
}),
    {getAll: queryAllGoods})
(AllGoods)