import React, {useEffect, useRef, useState} from 'react';
import {TextField} from "@mui/material";
import {connect} from "react-redux";
import {queryGoodsByName} from "../graphQL/getGoodsQuery";

const useDebounce = (cb, depArray, delay) => {
    let timeoutRef = useRef()

    useEffect(() => {
        clearInterval(timeoutRef.current)
        timeoutRef.current === undefined ? timeoutRef.current = -1 : timeoutRef.current = setTimeout(cb, delay)
    }, depArray)
};


const Search = ({onGetGoods, goodsByName}) => {
    const [name, setName] = useState('')

    useDebounce( () => onGetGoods(name), [name], 2000);
    useEffect(() => {
        setName('')
    }, [goodsByName])
    return (
        <div>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic" label="Search goods" variant="outlined" />
        </div>
    );
};

export const CSearch = connect((state) => ({
    goodsByName: state?.promise?.goodsByName?.payload
}), {
    onGetGoods: queryGoodsByName
})(Search);