import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import {CLoginForm} from "../pages/login/Login";
import {CRegistrationForm} from "../pages/login/Registration";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {IconButton} from "@mui/material";
import {CCartForm} from "../pages/cart/CartForm";
import {CGoodInfoCard} from "./GoodInfoCard";
import {CUserInfo} from "../pages/user/UserInfo";
import {CNewGoodForm} from "./admin/NewGoodForm";

const style = {
    position: 'absolute',
    height: '80vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    minHeight: '200px',
    boxShadow: 24,
    p: 4,
};



export const ModalWindow = ({modalType, children, width, good}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className='modal-box'>
                <div
                    className='modal-btn'
                    onClick={handleOpen}>
                    {children || modalType}
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <div id='closing-btn'>
                            <IconButton
                                size='large'
                                id='closing_btn'
                                onClick={handleClose}>
                                <HighlightOffIcon/>
                            </IconButton>
                        </div>
                        <Box sx={style} width={width}>

                            {modalType === 'log in' && <CLoginForm handleClose={handleClose}/>}
                            {modalType === 'sign in' && <CRegistrationForm handleClose={handleClose}/>}
                            {modalType === 'cart' && <CCartForm handleClose={handleClose}/>}
                            {modalType === 'good' && <CGoodInfoCard handleClose={handleClose} good={good}/>}
                            {modalType === 'user' && <CUserInfo/>}
                            {modalType === 'edit good' && <CNewGoodForm good={good} isEditing={true}/>}
                        </Box>
                    </div>

                </Modal>
            </div>
        </>
    );
}