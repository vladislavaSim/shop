import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {getCatsQuery, getGoodsByCat} from "../../graphQL/getCats";

const SideMenu = ({categories, getCats, getGoodsByCat, promise}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(() => getCats())
    }, [])
    console.log(promise)
    return (
        <aside className='side-menu'>
            <ul>
                { categories &&
                categories.map((item) => {
                    return <li
                        className='cats_item'
                        key={item._id}
                        onClick={() => dispatch(() => getGoodsByCat(item.name))}>
                            {item.name}
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
    getGoodsByCat: getGoodsByCat
})(SideMenu);