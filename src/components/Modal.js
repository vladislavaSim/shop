import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import {CLoginForm} from "../pages/login/Login";
import {CRegistrationForm} from "../pages/login/Registration";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {IconButton} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    minHeight: '200px',
    boxShadow: 24,
    p: 4,
};



export const ModalWindow = ({authType}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                onClick={handleOpen}>
                {authType}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                   <div id='closing-btn'>
                       <IconButton
                           size='large'
                           id='closing_btn'
                           onClick={handleClose}>
                           <HighlightOffIcon/>
                       </IconButton>
                   </div>
                    {authType === 'log in' ?
                        <CLoginForm handleClose={handleClose}/>
                    : <CRegistrationForm handleClose={handleClose}/>
                    }
                </Box>
            </Modal>
        </>
    );
}