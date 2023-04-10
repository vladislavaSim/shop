import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { ModalWindow } from './Modal';

const Confirm = ({ open, text, onYES, onNO, onClose, styles}) => {

    return (
        <Box className="confirm-box" style={styles}>
            <div open={open} onClose={() => onClose && onClose()}>
                <Typography textAlign="center" variant="h6">
                    {text}
                </Typography>
                <div>
                    <Button variant="contained" onClick={() => onYES && onYES()} color="success" style={{marginRight: "20px"}}>
                        Yes
                    </Button>
                    <Button variant="contained" onClick={() => onNO && onNO()} color="error">
                        No
                    </Button>
                </div>
            </div>
        </Box>
    );
};
 
export default Confirm;