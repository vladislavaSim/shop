import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@mui/material";
import {connect, useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {actionGoodUpsert} from "../../redux/actions/adminActions";
import {actionFilesUpload, actionFileUpload} from "../../redux/actions/actionFileUpload";
import {useNavigate} from "react-router";
import {clearPromiseByName} from "../../redux/actions/actionsPromise";
import ImagePreview from "./ImagePreview";
import {store} from "../../redux/store";
import {actionGoodById} from "../../graphQL/getGoodsQuery";
import {getCatsQuery} from "../../graphQL/getCats";

const NewGoodForm = ({onUploadFiles,
                         onUploadFile,
                         goodPic,
                         addNewGood,
                         allCats,
                         promise,
                         getCats,
                         good,
                         isEditing}) => {

    const [name, setName] = useState(good?.name || '')
    const [description, setDescription] = useState(good?.description || '')
    const [price, setPrice] = useState(good?.price || '')
    const [categories, setCategories] = useState(good?.categories || [])
    const [images, setImages] = useState(good?.images || [])
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    const dispatch = useDispatch()
    const navigate = useNavigate()

    // console.log(store.getState())

    useEffect(() => {
        getCats()
        return () => {
            navigate('/')
        }
    }, [])

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
        const imagesArr = images.map(img => {
            return {_id: img._id}
        })

        const obj = {
            name,
            description,
            price: +price,
            categories: categories,
            images: imagesArr || []
        };
        if(good?._id) {
            obj._id = good._id
        }
        return obj
    }


    function onUploadFunc(files) {
        if (files) {
            files.length > 1 ? onUploadFiles(files) : onUploadFile(files[0])
        }
    }

    function clearAll() {
        clearAllImages()
        setName('')
        setDescription('')
        setPrice('')
        setCategories(null)
    }
    // console.log(makeGoodObj())
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
                    remove images
                </Button>}
                <input
                    multiple={true}
                    onChange={(e) => onUploadFunc(e.target.files)}
                    type="file"
                />
                <Button
                    variant="contained"
                    color='error'
                    onClick={() => clearAll()}>
                    clear
                </Button>
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
                {allCats && allCats.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                        {cat.name}
                    </MenuItem>
                ))}
            </TextField>
            {<Button
                disabled={!name || !price || !categories.name}
                variant="contained"
                color='success'
                onClick={() => addNewGood(makeGoodObj())}>
                {isEditing ? 'Save' : 'Add'}
            </Button> }
        </div>
    );
};

export const CNewGoodForm = connect((state) => ({
    promise: state?.promise,
    allCats: state?.promise?.allCats?.payload,
    goodPic: state?.promise?.uploadFile?.payload,
}), {
    addNewGood: actionGoodUpsert,
    getCats: getCatsQuery,
    onUploadFile: actionFileUpload,
    onUploadFiles: actionFilesUpload
})(NewGoodForm);