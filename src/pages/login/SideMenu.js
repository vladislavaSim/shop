import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {getCatsQuery} from "../../graphQL/getCats";

const SideMenu = ({categories, getCats}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(() => getCats())
    }, [])
    console.log(categories)
    return (
        <aside className='side-menu'>
            { categories &&
                categories.map((item, key) => {
                    return <p key={item._id}>{item.name}</p>
                })
            }
        </aside>
    );
};

export const CSideMenu = connect((state) => ({
    categories: state?.promise?.allCats?.payload
}), {
    getCats: getCatsQuery
})(SideMenu);