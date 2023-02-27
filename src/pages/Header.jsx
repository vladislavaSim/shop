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
import {Link} from "react-router-dom";

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

    useEffect(() => {
        if(cart !== {}) {
            let counts = Object.values(cart)
            if(counts.length) {
                //getting total number of all goods from the cart
                setCartNumber(counts.map(item => item.count).reduce((acc, curr) => acc += curr))
            } else {
                setCartNumber(0)
            }
        }
    }, [cart])
    return (
        <header>
            <div className='header-box'>
                <img src={logo} alt="logo" className={'logo'}/>
                <ModalWindow modalType='user' width={700}>
                    <PersonIcon/>
                    {login ? login : 'Guest'}
                </ModalWindow>
            </div>
            {
                login === 'admin'
            && <Link to='/createNewGood'>
                create a good
            </Link>
            }
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
                            <StyledBadge badgeContent={cartNumber} color="error">
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


