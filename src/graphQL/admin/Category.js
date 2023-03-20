import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {CEditCategory} from "./EditCategory";
import {Link} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {actionCatById, getGoodsByCat} from "../getCats";
import {store} from "../../redux/store";
import {clearPromiseByName} from "../../redux/actions/actionsPromise";

const Category = ({isEdit, _id, name, getGoodsByCat, getCatById, promise}) => {
    const [isEditCatName, setIsEditCatName] = useState(false)

    console.log(store.getState())
    const dispatch = useDispatch()

    function editCatName(_id) {
        setIsEditCatName(true)
        getCatById(_id)
    }
    useEffect(() => {
        if(promise?.categoryUpsert?.status === 'RESOLVED') {
            setIsEditCatName(false)
            dispatch(clearPromiseByName('categoryUpsert'))
        }
    }, [promise])
    return (
        <>
            <li
            className='cats_item'
            key={_id}
            onClick={() => dispatch(() => getGoodsByCat(name))}>
            {isEdit && !isEditCatName &&
            <>
                <Button
                    size='small'
                    color='success'
                    variant="contained"
                    onClick={() => editCatName(_id)}>rename
                </Button>
                {/*<Button*/}
                {/*    size='small'*/}
                {/*    color='error'*/}
                {/*    variant="contained"*/}
                {/*    onClick={() => removeCat({_id, name})}>x*/}
                {/*</Button>*/}

            </>
            }
                {
                    isEditCatName
                     ?
                    <CEditCategory isEditCatName={isEditCatName}/>
                    :
                    <Link
                        to={'/' + name.toLowerCase().replace(/\s+/g, '_')} //regex for replacing %20 by _ in a pathname
                        className='cats_item'>
                            {name}
                    </Link>
                }
        </li>
        </>
    );
};

export const CCategory = connect((state) => ({
    cat: state?.promise?.catById?.payload,
    promise: state?.promise
}), {
    getCatById: actionCatById,
    getGoodsByCat: getGoodsByCat
})(Category)