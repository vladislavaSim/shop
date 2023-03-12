import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@mui/material";
import {connect, useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {actionGoodUpsert} from "../../redux/actions/adminActions";
import {actionFilesUpload, actionFileUpload} from "../../redux/actions/actionFileUpload";
import {useNavigate} from "react-router";
import {clearPromiseByName} from "../../redux/actions/actionsPromise";
import ImagePreview from "./ImagePreview";

const NewGoodForm = ({onUploadFiles,
                         onUploadFile,
                         goodPic,
                         addNewGood,
                         allCats,
                         promise,
                         good,
                         isEditing}) => {

    const [name, setName] = useState(good?.name || '')
    const [description, setDescription] = useState(good?.description || '')
    const [price, setPrice] = useState(good?.price || '')
    const [categories, setCategories] = useState()
    const [images, setImages] = useState(good?.images || [])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(good)
    useEffect(() => {
        if(promise?.goodUpsert?.status === 'RESOLVED') {
            navigate('/')
        }
    }, [promise])

    function deleteImage(image) {
        setImages(images.filter(img => img._id !== image))
    }

    function clearAllImages() {
        dispatch(clearPromiseByName('uploadFile'))
        setImages([])
    }

    useEffect(() => {
        if(promise?.uploadFile?.status === 'RESOLVED') {
            const newPics = goodPic.length ? goodPic : [goodPic]
            setImages([...images, ...newPics])
        }
    }, [promise])

    function makeGoodObj() {
        const obj = {
            name,
            description,
            price: +price,
            categories: [categories] || [],
            images: images.map(img => {
                return {_id: img._id}
            })
        };
        if(good?._id) {
            obj._id = good._id
        }
        return obj
    }

    console.log(makeGoodObj())

    console.log(good?.categories[0])
    function onUploadFunc(files) {
        if(files) {
            files.length > 1 ? onUploadFiles(files) : onUploadFile(files[0])
        }
    }

    return (
        <div className='admin-form'>
            <div className='preview-box'>
                {
                    images && images.map((image, key) => {
                        return <ImagePreview key={key} image={image} alt="preview" deleteImg={deleteImage}/>
                    })
                }
                {images.length > 1 && <Button
                    size='small'
                    variant='filled'
                    color='error'
                    onClick={() => clearAllImages()}>
                    Clear
                </Button>}
                <input
                    multiple={true}
                    onChange={(e) => onUploadFunc(e.target.files)}
                    type="file"
                />
            </div>
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
                select
                label="category"
                defaultValue={good && good?.categories && good?.categories[0]?.name || "Smartphone"}
                helperText="Please select the category"
                onChange={(e, newValue) => setCategories({name: e.target.value, _id: newValue.key.substring(2, newValue.key.length)})}>
                {allCats.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                        {cat.name}
                    </MenuItem>
                ))}
            </TextField>
            <Button
                variant="contained"
                color='success'
                onClick={() => addNewGood(makeGoodObj())}>
                {isEditing ? 'Save' : 'Add'}
            </Button>
        </div>
    );
};

export const CNewGoodForm = connect((state) => ({
    promise: state?.promise,
    allCats: state?.promise?.allCats?.payload,
    goodPic: state?.promise?.uploadFile?.payload,
}), {
    addNewGood: actionGoodUpsert,
    onUploadFile: actionFileUpload,
    onUploadFiles: actionFilesUpload
})(NewGoodForm);