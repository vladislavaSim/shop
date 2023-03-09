import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@mui/material";
import {connect, useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {actionGoodUpsert} from "../../redux/actions/adminActions";
import {actionFilesUpload, actionFileUpload} from "../../redux/actions/actionFileUpload";
import {store} from "../../redux/store";
import {backendUrl} from "../../graphQL/url";
import {useNavigate} from "react-router";
import {CImageUpload} from "./ImageUpload";

const NewGoodForm = ({onUploadFiles, onUploadFile, goodPic, addNewGood, allCats, promise}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [categories, setCategories] = useState()
    const [images, setImages] = useState()

    const navigate = useNavigate()
    console.log(store.getState())

    function makeGoodObj() {
        let goodToSave = {};
        goodToSave.name = name;
        goodToSave.description = description;
        goodToSave.price = +price;
        goodToSave.categories = [categories]
        goodToSave.images = images;
        console.log(goodToSave)
        return goodToSave
    }

    useEffect(() => {
        if(promise?.goodUpsert?.status === 'RESOLVED') {
            navigate('/')
        }
    }, [promise])

    //setting images for preview after uploading (for 1 pic or more)
    useEffect(() => {
        if(promise?.uploadFile?.status === 'RESOLVED') {
            setImages(goodPic.length > 1 ? goodPic.map(item => {
                return {'_id': item._id}
            }) : {'_id': goodPic._id})
        }
    }, [promise])

    function onUploadFunc(files) {
        if(files) {
            files.length > 1 ? onUploadFiles(files) : onUploadFile(files[0])
        }
    }
    return (
        <div className='admin-form'>
            <CImageUpload/>
            <input
                multiple={true}
                onChange={(e) => onUploadFunc(e.target.files)}
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
    goodPic: state?.promise?.uploadFile?.payload,
    goodPics: state?.promise?.uploadFiles?.payload
}), {
    addNewGood: actionGoodUpsert,
    onUploadFile: actionFileUpload,
    onUploadFiles: actionFilesUpload
})(NewGoodForm);