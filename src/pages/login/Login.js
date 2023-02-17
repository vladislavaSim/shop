import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {connect} from "react-redux";
import {queryLogin} from "../../graphQL/queryAuth";
import {actionLogout, fullAuthLogin} from "../../redux/actions/actionsAuth";
import {store} from "../../redux/store";

const LoginForm = ({doLogin, isLogged, doLogout, handleClose}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(isLogged.token) {
            handleClose()
        }
    }, [isLogged])
    console.log(isLogged)
    console.log(store.getState())
    return (
        <div>
           <div className='login-form'>
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
                   disabled={!login && !password}
                   variant="contained"
                   onClick={() => doLogin(login, password)}
                   color="success">
                   Log in
               </Button>
           </div>
        </div>
    );
};

export const CLoginForm = connect((state) => ({
    isLogged: state?.auth
}), {
    doLogin: fullAuthLogin,
    doLogout: actionLogout
})(LoginForm);