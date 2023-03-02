import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {getCatsQuery, getGoodsByCat} from "../../graphQL/getCats";
import {queryAllGoods} from "../../graphQL/getGoodsQuery";
import {Link} from "react-router-dom";
import {queryCatDelete} from "../../graphQL/admin/actionCategory";
import Button from "@mui/material/Button";

const SideMenu = ({categories, login, getGoodsByCat, removeCat}) => {
    const dispatch = useDispatch()

    return (
        <aside className='side-menu'>
            <ul>
                { categories &&
                categories.map(({_id, name}) => {
                    return <li
                                className='cats_item'
                                key={_id}
                                onClick={() => dispatch(() => getGoodsByCat(name))}>
                                <Link to='/' className='cats_item'>
                                    {name}
                                </Link>
                        {login === 'admin' && <Button color='error' variant="contained" onClick={() => removeCat({_id, name})}>x</Button>}
                            </li>
                })
                }
            </ul>
        </aside>
    );
};

export const CSideMenu = connect((state) => ({
    categories: state?.promise?.allCats?.payload,
    promise: state?.promise,
    login: state?.auth?.payload?.sub?.login
}), {
    getCats: getCatsQuery,
    getGoodsByCat: getGoodsByCat,
    getAll: queryAllGoods,
    removeCat: queryCatDelete
})(SideMenu);