import React from 'react';
import logo from '../images/logot.png'
import {Button, IconButton} from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {ModalWindow} from "../components/Modal";
import {connect} from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import {actionLogout} from "../redux/actions/actionsAuth";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const Header = ({login, doLogout}) => {
    return (
        <header>
            <div className='header-box'>
                <img src={logo} alt="logo" className={'logo'}/>
                <PersonIcon/>
                {login ? login : 'Guest'}
            </div>
            <div className='header-box'>
                {!login
                    ? <div className='auth-buttons-box'>
                        <ModalWindow authType={'log in'}/>
                        <ModalWindow authType={'sign up'}/>
                    </div>
                    :
                    <Button
                        variant="contained"
                        onClick={() => doLogout()}
                        color="success">
                        Log out
                    </Button>
                }
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="error">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </div>
        </header>
    );
};

export const CHeader = connect((state) => ({
    login: state?.auth?.payload?.sub?.login
}), {
    doLogout: actionLogout
})(Header);
