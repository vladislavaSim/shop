import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {connect} from "react-redux";
import {queryLogin} from "../../graphQL/queryAuth";
import {actionLogout, fullAuthLogin} from "../../redux/actions/actionsAuth";
import {store} from "../../redux/store";

const Login = ({doLogin, isLogged, doLogout}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        console.log(isLogged)
    }, [isLogged])

    console.log(store.getState())
    return (
        <div>
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
            <Button
                // disabled={!isLogged}
                variant="contained"
                onClick={() => doLogout()}
                color="success">
                Log out
            </Button>
        </div>
    );
};

export const CLogin = connect((state) => ({
    isLogged: state?.auth
}), {
    doLogin: fullAuthLogin,
    doLogout: actionLogout
})(Login);