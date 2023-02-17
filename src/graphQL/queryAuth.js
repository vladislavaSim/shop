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
export const queryRegister = (login, password) => {
    return actionPromise('register',
        gql(`
           mutation register($login: String, $password: String){
              UserUpsert(user: {login: $login, password: $password}){
                login _id createdAt acl 
              }
            }`,
            {login: login, password: password}))
}

// Vasya - 123123
// admin - 123123
// Oliver
// vsim, kot, kotik
