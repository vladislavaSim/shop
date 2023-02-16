import React from 'react';
import logo from '../images/logot.png'
import {Button, IconButton} from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const Header = () => {
    return (
        <header>
            <div>
                <img src={logo} alt="logo" className={'logo'}/>
            </div>

            <div>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="error">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </div>
           <div>
               <Button>Log in</Button>
               <Button>Sign up</Button>
           </div>
        </header>
    );
};

export default Header;