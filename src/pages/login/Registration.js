import React, {useEffect, useState} from 'react';
import {store} from "../../redux/store";
import {Button, TextField} from "@mui/material";
import {connect} from "react-redux";
import {queryRegister} from "../../graphQL/queryAuth";
import {fullAuthRegister} from "../../redux/actions/actionsAuth";

const Registration = ({doRegister, isLogged, handleClose}) => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(isLogged.token) {
            handleClose()
        }
    }, [isLogged])

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
                    onClick={() => doRegister(login, password)}
                    color="success">
                    Create an account
                </Button>
            </div>
        </div>
    );
};

export const CRegistrationForm = connect((state) => ({
    isLogged: state?.auth
}), {
    doRegister: fullAuthRegister
})(Registration);