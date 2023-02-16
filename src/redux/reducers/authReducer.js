function jwtDecode(token){
    try {
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch(e){
    }
}

export function authReducer(state, {type, token}) {
    if (!state) {
        if (localStorage.authToken) {
            console.log(token)
            token = localStorage.authToken
            type = "AUTH_LOGIN"
        } else {
            return {}
        }
    }
    if (type === "AUTH_LOGIN") {
        let payload = jwtDecode(token)
        console.log(token)
        if (typeof payload === 'object') {
            localStorage.authToken = token
            return {
                ...state,
                token,
                payload
            }
        } else {
            return state
        }
    }
    if (type === "AUTH_LOGOUT") {
        localStorage.removeItem('authToken')
        window.location.reload()
        return {}
    }
    return state
}