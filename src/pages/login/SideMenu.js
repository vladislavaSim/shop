import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {actionCatById, getCatsQuery, getGoodsByCat} from "../../graphQL/getCats";
import {queryAllGoods} from "../../graphQL/getGoodsQuery";
import {Link} from "react-router-dom";
import {actionCategoryUpsert, queryCatDelete} from "../../graphQL/admin/actionCategory";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useLocation} from "react-router";
import {CEditCategory} from "../../graphQL/admin/EditCategory";
import {CCategory} from "../../graphQL/admin/Category";
import {store} from "../../redux/store";
import {clearPromiseByName} from "../../redux/actions/actionsPromise";

const SideMenu = ({categories, login, addCat, getGoodsByCat, removeCat, getAll, getCatById, promise, getCats}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [newCatName, setNewCatName] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if(promise?.categoryUpsert?.status === 'RESOLVED') {
            console.log('cat upserted!!!')
            setIsEdit(false)
            dispatch(clearPromiseByName('categoryUpsert'))
            dispatch(() => getAll())
            dispatch(() => getCats())
        }
    }, [promise])

    useEffect(() => {
        getCats()
    }, [categories])


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

                <li
                    style={{fontWeight: "600"}}
                    className='cats_item'
                    onClick={() => dispatch(() => getAll())}>
                       • All
                </li>
                {
                    isEdit &&
                    <div className='cat-editing-box'>
                        <TextField
                            size={'small'}
                            required
                            id="outlined-required"
                            onChange={(e) => setNewCatName(e.target.value)}
                            value={newCatName}
                        />
                        <Button
                            onClick={() => addCat({name: newCatName})}
                            size='small'
                            color='success'
                            disabled={!newCatName}
                            variant="contained">
                            Add category
                        </Button>
                    </div>
                }

                { categories &&
                categories.map(({_id, name}) => {
                    return <CCategory key={_id} name={name} _id={_id} isEdit={isEdit} removeCat={removeCat}/>
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
    addCat: actionCategoryUpsert,
    getCatById: actionCatById
})(SideMenu);