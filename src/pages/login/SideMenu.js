import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {getCatsQuery, getGoodsByCat} from "../../graphQL/getCats";
import {queryAllGoods} from "../../graphQL/getGoodsQuery";
import {Link} from "react-router-dom";
import {actionCategoryUpsert, queryCatDelete} from "../../graphQL/admin/actionCategory";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useLocation} from "react-router";

const SideMenu = ({categories, login, addCat, getGoodsByCat, removeCat, getAll}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [newCat, setNewCat] = useState('')

    const dispatch = useDispatch()
    const location = useLocation()
    console.log(location.pathname)
    return (
        <aside className='side-menu'>
            <ul>
            {login === 'admin' &&
            <Button
                onClick={() => setIsEdit(!isEdit)}
                size='small'
                color='error'
                variant="contained">
                {isEdit ? 'End editing' : 'Edit categories'}
            </Button>}
            {
                isEdit &&
                <div className='cat-editing-box'>
                    <TextField
                        size={'small'}
                        required
                        id="outlined-required"
                        label="new category name"
                        onChange={(e) => setNewCat(e.target.value)}
                        value={newCat}
                    />
                    <Button
                        style={{padding: 0}}
                        onClick={() => addCat({name: newCat, subCategories: [], goods: []})}
                        size='small'
                        color='success'
                        disabled={!newCat}
                        variant="contained">
                        Add
                    </Button>
                </div>
            }
                <li
                    style={{fontWeight: "600"}}
                    className='cats_item'
                    onClick={() => dispatch(() => getAll())}>
                       • All
                </li>
                { categories &&
                categories.map(({_id, name}) => {
                    // console.log('/' + name.toLowerCase().split(' ').join('_'))
                    return <li
                                className='cats_item'
                                key={_id}
                                onClick={() => dispatch(() => getGoodsByCat(name))}>
                        {isEdit &&
                            <Button
                                size='small'
                                color='error'
                                variant="contained"
                                onClick={() => removeCat({_id, name})}>x
                            </Button>
                        }
                        <Link
                            to={'/' + name.toLowerCase().replace(/\s+/g, '_')} //regex for replacing %20 by _ in a pathname
                            className='cats_item'>
                                    {name}
                        </Link>
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
    login: state?.auth?.payload?.sub?.login,
    allGoods: state?.promise?.allGoods?.payload
}), {
    getCats: getCatsQuery,
    getGoodsByCat: getGoodsByCat,
    getAll: queryAllGoods,
    removeCat: queryCatDelete,
    addCat: actionCategoryUpsert
})(SideMenu);