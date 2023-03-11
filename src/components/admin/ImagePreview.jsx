import React from 'react';
import {backendUrl} from "../../graphQL/url";
import CancelIcon from '@mui/icons-material/Cancel';
import {IconButton} from "@mui/material";

const style = {height: '160px', width: 'auto'}

const ImagePreview = ({image, deleteImg}) => {

    return (
        <div>
            <>
                <IconButton
                    size='large'
                    id='removing-btn'
                    onClick={() => deleteImg(image._id)}>
                    <CancelIcon/>
                </IconButton>
            </>

            <img style={style} src={backendUrl + image.url}/>
        </div>
    );
};

export default ImagePreview;