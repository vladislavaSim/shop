import React from 'react';
import {backendUrl} from "../../graphQL/url";
import {connect, useDispatch} from "react-redux";
import {actionGoodUpsert} from "../../redux/actions/adminActions";
import {actionFilesUpload, actionFileUpload} from "../../redux/actions/actionFileUpload";
import {getIn} from "formik";
import {clearPromiseByName} from "../../redux/actions/actionsPromise";
import Button from "@mui/material/Button";

const style = {height: 'auto', width: '250px'}

const ImageUpload = ({goodPic, onUploadFile, onUploadFiles}) => {
    const dispatch = useDispatch()
    console.log(goodPic)
    function getImg() {
        if(goodPic) {
            return goodPic.length > 1 ?
                goodPic.map(pic => {
                    return  <img src={backendUrl + pic.url} key={pic._id} style={style}/>})
                :  <img src={backendUrl + goodPic.url} style={style}/>
        }
        }

    return (
        <div className='preview-box'>
            {getImg()}
            <Button size='small' variant='filled' color='error' onClick={() => dispatch(clearPromiseByName('uploadFile'))}>Clear</Button>
        </div>
    );
};

export const CImageUpload = connect((state) => ({
    promise: state?.promise,
    goodPic: state?.promise?.uploadFile?.payload,
    goodPics: state?.promise?.uploadFiles?.payload
}), {
    onUploadFile: actionFileUpload,
    onUploadFiles: actionFilesUpload,
    clearPromise: clearPromiseByName
})(ImageUpload);