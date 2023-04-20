import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {CEditCategory} from "./EditCategory";
import {Link} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {actionCatById, getGoodsByCat} from "../getCats";
import {store} from "../../redux/store";
import {clearPromiseByName} from "../../redux/actions/actionsPromise";
import Confirm from '../../components/Confirm';

const Category = ({isEdit, _id, name, getGoodsByCat, getCatById, promise, removeCat}) => {
    const [isEditCatName, setIsEditCatName] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


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
    // useEffect(() => {
    //     console.log(isDeleteModalOpen);
    // }, [isDeleteModalOpen])

    function getLinkOrCatName() {
        if(isEdit || isDeleteModalOpen) {
            return <div className='cats_item'>{name}</div>
        } else {
            return <Link
                        to={'/' + name.toLowerCase().replace(/\s+/g, '_')} //regex for replacing %20 by _ in a pathname
                        className='cats_item'>
                            {name}
                    </Link>
        }
    }
    return (
        <>
            <li
            className='cats_item'
            key={_id}
            onClick={() => dispatch(() => !isEdit && getGoodsByCat(name))}>
            {isEdit && !isEditCatName &&
            <>
                
            

                         {  isDeleteModalOpen ? <Confirm
                                open={isDeleteModalOpen}
                                text={`Delete category "${name}"?`}
                                onClose={() => setIsDeleteModalOpen(false)}
                                onNO={() => setIsDeleteModalOpen(false)}
                                onYES={() => removeCat({_id, name})}
                            />
                            : 
                            <>
                                <Button
                                    size='small'
                                    color='success'
                                    variant="contained"
                                    onClick={() => editCatName(_id)}>rename
                                </Button>
                                <Button
                                size='small'
                                color='error'
                                variant="contained"
                                onClick={() => setIsDeleteModalOpen(true)}>x
                            </Button>
                         </>
                        }
            

               
            </>
            }
                {
                    isEditCatName
                     ?
                    <CEditCategory isEditCatName={isEditCatName}/>
                    :
                     getLinkOrCatName()
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