import React, {useEffect, useRef, useState} from 'react';
import {TextField} from "@mui/material";
import {connect} from "react-redux";
import {queryGoodsByName} from "../graphQL/getGoodsQuery";

const useDebounce = (cb, depArray, delay) => {
    let timeoutRef = useRef()

    useEffect(() => {
        if(depArray[0]) {
            clearInterval(timeoutRef.current)
            timeoutRef.current === undefined ? timeoutRef.current = -1 : timeoutRef.current = setTimeout(cb, delay)
        }
    }, depArray)

};

const Search = ({onGetGoods, promise}) => {
    const [name, setName] = useState('')

    useDebounce( () => onGetGoods(name), [name], 2000);

    useEffect(() => {
        if(promise?.goodsByName?.status === 'RESOLVED') {
            setName('')
        }
    }, [promise])

    return (
        <div>
            <TextField
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic" label="Search goods" variant="outlined" />
        </div>
    );
};

export const CSearch = connect((state) => ({
    promise: state?.promise,
    goodsByName: state?.promise?.goodsByName?.payload
}), {
    onGetGoods: queryGoodsByName
})(Search);