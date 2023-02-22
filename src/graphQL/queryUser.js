import {actionPromise} from "../redux/reducers/promiseReducer";
import {gql} from "./getgql";

export const findUserById = (id) => {
    console.log(id)
    return actionPromise('userById',
        gql(`query UsersById($_id:String){
                UserFindOne(query: $_id){
                    _id acl login nick
                    avatar{
                        _id url
                    }
                }
            }`,
            { _id: JSON.stringify([{ _id: id }]) }
            )
    )
}