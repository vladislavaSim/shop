import {queryLogin, queryRegister} from "../../graphQL/queryAuth";

export const actionLogin = (token) => {
    return {type: 'AUTH_LOGIN', token}
}

export const actionLogout = () => {
    return {type: 'AUTH_LOGOUT'}
}
export const fullAuthLogin = (login, password) => (
    async (dispatch) => {
        let token = await dispatch(queryLogin(login, password))
        if(token) {
            await dispatch(actionLogin(token))
        }
    }
)
export const fullAuthRegister = (login, password) => (
    async (dispatch) => {
        let token = await dispatch(queryRegister(login, password))
        if(token) {
            await dispatch(fullAuthLogin(login, password))
        }
    }
)

