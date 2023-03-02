import React, {useState} from 'react';
import {MenuItem, Select, TextField} from "@mui/material";
import {connect, useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {actionGoodUpsert} from "../../redux/actions/adminActions";
import {actionFilesUpload, actionFileUpload} from "../../redux/actions/actionFileUpload";
import {store} from "../../redux/store";
import {backendUrl} from "../../graphQL/url";

const NewGoodForm = ({onUploadFile, goodPic, addNewGood, allCats}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [categories, setCategories] = useState()
    //
    // console.log(store.getState())
    console.log(categories)
    function makeGoodObj() {
        let goodToSave = {};
        goodToSave.name = name;
        goodToSave.description = description;
        goodToSave.price = +price;
        goodToSave.categories = [categories]
        goodToSave.images = [];
        goodToSave.images.push({_id: goodPic?._id})
        return goodToSave
    }

    console.log(categories)

    return (
        <div className='admin-form'>
            {goodPic && <img src={backendUrl + goodPic.url} style={{height: 'auto', width: '250px'}}/> }
            <input
                onChange={(e) => onUploadFile(e.target.files[0])}
                type="file"
            />
            <TextField
                required
                id="outlined-required"
                label="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <TextField
                required
                multiline={true}
                id="outlined-required"
                label="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            <TextField
                required
                id="outlined-required"
                label="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            <TextField
                // id="outlined-select-currency"
                select
                label="category"
                defaultValue="Smartphone"
                helperText="Please select the category"
                onChange={(e, newValue) => setCategories({name: e.target.value, _id: newValue.key.substring(2, newValue.key.length)})}>
                {allCats.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                        {cat.name}
                    </MenuItem>
                ))}
            </TextField>
            {/*<Select*/}
            {/*    placeholder="Обрати категорії"*/}
            {/*    value={categories.map(({ _id, name }) => ({ value: _id, label: name }))}*/}
            {/*    closeMenuOnSelect={false}*/}
            {/*    onChange={(e) => allCats(e.map(({ label, value }) => ({ _id: value, name: label })))}*/}
            {/*    options={allCats?.map(({ _id, name }) => ({ value: _id, label: name }))}*/}
            {/*    isMulti={true}*/}
            {/*/>*/}
            <Button
                variant="contained"
                color='success'
                onClick={() => addNewGood(makeGoodObj())}>
                Add
            </Button>
        </div>
    );
};

export const CNewGoodForm = connect((state) => ({
    promise: state?.promise,
    allCats: state?.promise?.allCats?.payload,
    goodPic: state?.promise?.uploadFile?.payload
}), {
    addNewGood: actionGoodUpsert,
    onUploadFile: actionFileUpload,
    onUploadFiles: actionFilesUpload
})(NewGoodForm);