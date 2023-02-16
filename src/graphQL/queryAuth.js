import {actionPromise} from "../redux/reducers/promiseReducer";
import {gql} from "./getgql";

export const queryLogin = (login, password) => {
    return actionPromise('login',
            gql(`
            query Login($login: String, $password: String){
              login(login: $login, password: $password)
            }`,
                {login: login, password: password}))
}