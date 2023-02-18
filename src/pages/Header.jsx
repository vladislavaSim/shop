import React, {useEffect, useState} from 'react';
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

const Header = ({login, doLogout, cart}) => {
    const [cartNumber, setCartNumber] = useState(0)
    console.log(cart)
    useEffect(() => {
        console.log(cart)
        if(cart.count) {
            let counts = Object.values(cart)
            //getting total number of all goods from the cart
            setCartNumber(counts.map(item => item.count).reduce((acc, curr) => acc += curr))
            console.log(cartNumber)
        }
    }, [cart])
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
                        <ModalWindow modalType={'log in'} width={400}/>
                        <ModalWindow modalType={'sign up'} width={400}/>
                    </div>
                    :
                    <Button
                        variant="contained"
                        onClick={() => doLogout()}
                        color="success">
                        Log out
                    </Button>
                }
                <div>
                    <ModalWindow modalType='cart' width={700}>
                        <IconButton aria-label="cart" style={{color: 'yellow'}}>
                            <StyledBadge badgeContent={cartNumber || 0} color="error">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </ModalWindow>

                </div>
            </div>
        </header>
    );
};

export const CHeader = connect((state) => ({
    login: state?.auth?.payload?.sub?.login,
    cart: state?.cart
}), {
    doLogout: actionLogout
})(Header);
