import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import {CLoginForm} from "../pages/login/Login";
import {CRegistrationForm} from "../pages/login/Registration";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {IconButton} from "@mui/material";
import {CCartForm} from "../pages/cart/CartForm";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    minHeight: '200px',
    boxShadow: 24,
    p: 4,
};



export const ModalWindow = ({modalType, children, width}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div
                onClick={handleOpen}>
                {children || modalType}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} width={width}>
                   <div id='closing-btn'>
                       <IconButton
                           size='large'
                           id='closing_btn'
                           onClick={handleClose}>
                           <HighlightOffIcon/>
                       </IconButton>
                   </div>
                    {modalType === 'log in' && <CLoginForm handleClose={handleClose}/>}
                    {modalType === 'sign in' && <CRegistrationForm handleClose={handleClose}/>}
                    {modalType === 'cart' && <CCartForm/>}
                </Box>
            </Modal>
        </>
    );
}