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
import Confirm from '../components/Confirm';

//styles for number badge on a cart icon
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const styles = {
    backgroundColor: 'transparent',
    scale: '.8'
}
const Header = ({login, doLogout, cart}) => {
    const [cartNumber, setCartNumber] = useState(0)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    function showLogoutBtn() {
        // console.log(isDeleteModalOpen);
        if(login && !isDeleteModalOpen) {
            return <Button
            variant="contained"
            onClick={() => setIsDeleteModalOpen(true)}
            color="success">
            Log out
            </Button>
        }
        else if(login && isDeleteModalOpen) {
            return <Confirm open={isDeleteModalOpen}
                styles={styles}
                text={`Are you sure to log out?`}
                onClose={() => setIsDeleteModalOpen(false)}
                onNO={() => setIsDeleteModalOpen(false)}
                onYES={() => doLogout()}
        />
        }
     else if(!login) {
        return <div className='auth-buttons-box'>
            <ModalWindow modalType={'log in'} width={400}/>
            <ModalWindow modalType={'sign up'} width={400}/>
    </div>
    }
}
    // useEffect(() => {
    //     setIsDeleteModalOpen(false)
    // }, [login])

    // console.log(isDeleteModalOpen);
    // console.log(login);
    return (
        <header>
            <div className='header-box'>
               <Link to='/'>
                   <img src={logo} alt="logo" className={'logo'}/>
               </Link>
                <ModalWindow modalType='user' width={700}>
                    <PersonIcon/>
                    {login ? login : 'Guest'}
                </ModalWindow>
            </div>
            {
                login === 'admin'
            && <Button variant="contained">
                    <Link to='/createNewGood' style={{color: "white"}}>
                         create a good
                    </Link>
                </Button>
            }
            <div className='header-box'>
               {showLogoutBtn()}
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


