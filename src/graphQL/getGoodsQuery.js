
import {actionPromise} from "../redux/reducers/promiseReducer";
import {gql} from "./getgql";

export const queryAllGoods = () => {
    return actionPromise('allGoods',
        gql(`query cats{
                CategoryFind(query: "[{}]"){
                   _id, name, image {
                       _id
                        createdAt
                        text
                        url
                        originalFileName
                    }
                }
            }`)
        )
}