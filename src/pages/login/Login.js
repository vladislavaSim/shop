import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {connect} from "react-redux";
import {actionLogout, fullAuthLogin} from "../../redux/actions/actionsAuth";

const LoginForm = ({doLogin, isLogged, doLogout, handleClose}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(isLogged.token) {
            handleClose()
        }
    }, [isLogged])

    return (
        <>
           <div className='login-form'>
               <h3>Please, log in</h3>
               <TextField
                   required
                   id="outlined-required"
                   label="login"
                   onChange={(e) => setLogin(e.target.value)}
                   value={login}
               />
               <TextField
                   required
                   id="outlined-required"
                   label="password"
                   onChange={(e) => setPassword(e.target.value)}
                   value={password}
               />
               <Button
                   disabled={login.length < 4 && password.length < 5}
                   variant="contained"
                   onClick={() => doLogin(login, password)}
                   color="success">
                   Log in
               </Button>
           </div>
        </>
    );
};

export const CLoginForm = connect((state) => ({
    isLogged: state?.auth
}), {
    doLogin: fullAuthLogin,
    doLogout: actionLogout
})(LoginForm);