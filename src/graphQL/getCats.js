import {actionPromise} from "../redux/reducers/promiseReducer";
import {gql} from "./getgql";

export const getCatsQuery = () => {
    return actionPromise('allCats',
        gql(`query allCats{
              CategoryFind(query: "[{}]"){
                _id name goods{
                  name _id
                }
              }
            }`)
        )
}