import React, {useEffect, useState} from 'react';
import {store} from "../../redux/store";
import {Alert, Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {connect} from "react-redux";
import {fullAuthRegister} from "../../redux/actions/actionsAuth";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Registration = ({doRegister, isLogged, handleClose}) => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if(isLogged.token) {
            handleClose()
        }
    }, [isLogged])

    function checkIfFormOkay() {
        if(login.length && password.length && passwordAgain.length) {
            if(password.length > 4) {
                if(password === passwordAgain) {
                    setError('')
                    doRegister(login, password)
                } else {
                    setError('password repeated incorrectly')
                }
            } else {
                setError('password must contain at least 5 characters')
            }
        } else {
            setError('all the fields cannot be empty')
        }
    }

    return (
        <>
            <div className='login-form'>
                <h3>Please, sign up</h3>
                <TextField
                    required
                    id="outlined-required"
                    label="login"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                />
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="outlined-required"
                    label="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    InputProps={{
                        endAdornment:  <InputAdornment>
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="outlined-required"
                    label="password again"
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    value={passwordAgain}
                />
                <Button
                    variant="contained"
                    onClick={() => checkIfFormOkay()}
                    color="success">
                    Create an account
                </Button>
            </div>
            {
                error && <Alert severity={"error"}>{error}</Alert>
            }
        </>
    );
};

export const CRegistrationForm = connect((state) => ({
    isLogged: state?.auth
}), {
    doRegister: fullAuthRegister
})(Registration);