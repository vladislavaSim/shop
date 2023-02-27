import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {getCatsQuery, getGoodsByCat} from "../../graphQL/getCats";
import {queryAllGoods} from "../../graphQL/getGoodsQuery";
import {Link} from "react-router-dom";

const SideMenu = ({categories, getCats, getGoodsByCat, getAll}) => {
    const dispatch = useDispatch()
    //
    // //initial getting all categories
    // useEffect(() => {
    //     dispatch(() => getCats())
    //     dispatch(() => getAll())
    // }, [])
    // console.log(promise)
    return (
        <aside className='side-menu'>
            <ul>
                { categories &&
                categories.map((item) => {
                    return <li
                        className='cats_item'
                        key={item._id}
                        onClick={() => dispatch(() => getGoodsByCat(item.name))}>
                        <Link to='/' className='cats_item'>{item.name}</Link>
                            </li>
                })
                }
            </ul>
        </aside>
    );
};

export const CSideMenu = connect((state) => ({
    categories: state?.promise?.allCats?.payload,
    promise: state?.promise
}), {
    getCats: getCatsQuery,
    getGoodsByCat: getGoodsByCat,
    getAll: queryAllGoods
})(SideMenu);