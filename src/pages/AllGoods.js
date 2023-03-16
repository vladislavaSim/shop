import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import ScrollUpButton from "react-scroll-up-button";import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {CSearch} from "../components/Search";
import Goods from "./Goods";
import {store} from "../redux/store";


const AllGoods = ({getAll, allGoods, goodsByCat, goodsByName, cart}) => {
    const [goods, setGoods] = useState(null)
    const [sortedBy, setSortedBy] = useState('old')

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

    useEffect(() => {
        setGoods(goodsByName)
    }, [goodsByName])

    console.log(store.getState())
    return (
       <>
           <div className='inputs-box'>
               <FormControl fullWidth style={{width: '300px'}}>
                   <InputLabel id="demo-simple-select-label">Sort</InputLabel>

                   <Select
                       size='small'
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
               <CSearch/>

               <Button onClick={() => setGoods(allGoods)}
                       color="error"
                       size={'small'}
                       variant="outlined">Reset filters</Button>
           </div>
           <div>
               {goods && <Goods goods={goods}/>}
               <ScrollUpButton ContainerClassName="MyOverRideClass" />
           </div>
       </>
    );
};

export const CAllGoods = connect((state) => ({
    allGoods: state?.promise?.allGoods?.payload,
    goodsByCat: state?.promise?.goodsByCat?.payload?.goods,
    goodsByName: state?.promise?.goodsByName?.payload,
    cart: state?.cart
}),
    null)
(AllGoods)