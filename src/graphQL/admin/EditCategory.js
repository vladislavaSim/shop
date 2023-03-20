import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {actionCategoryUpsert} from "./actionCategory";
import {connect} from "react-redux";
import {actionCatById} from "../getCats";
import {store} from "../../redux/store";

const EditCategory = ({isEditCatName, cat, addCat}) => {
    const [editedName, setEditedName] = useState('')


    useEffect(() => {
       setEditedName(cat?.name)
    }, [cat])



    console.log(editedName)
    // console.log(store.getState())
    return (
        <>
            {
                cat &&
                <div className='cat-editing-box'>
                    <TextField
                        size={'small'}
                        required
                        id="outlined-required"
                        onChange={(e) => setEditedName(e.target.value)}
                        value={editedName}
                    />
                    <Button
                        style={{padding: 0}}
                        onClick={() => addCat({name: editedName, _id: cat?._id})}
                        size='small'
                        color='success'
                        // disabled={!newCat}
                        variant="contained">
                        Save
                    </Button>
                </div>
            }
        </>
    );
};

export const CEditCategory = connect((state) => ({
    cat: state?.promise?.catById?.payload
}), {
    addCat: actionCategoryUpsert,

})(EditCategory);