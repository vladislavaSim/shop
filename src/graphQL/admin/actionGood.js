import {actionPromise} from "../../redux/reducers/promiseReducer";
import {gql} from "../getgql";

export const queryGoodUpsert = (good) => {
    console.log(good)
    console.log('GOOD UPSERT!!!!!')
    return actionPromise('goodUpsert',
        gql(`mutation addNewGood($good: GoodInput!){
              GoodUpsert(good: $good) {
                _id name description price images {
                  _id url
                }
                categories{
                    name
                }
              }
            }`, {good}
        )
    )
}

export const queryGoodDelete = (good) => {
    console.log(good)
    return actionPromise('goodDelete',
        gql(`mutation addNewGood($good: GoodInput!){
             GoodDelete(good:$good){
                    _id name
                }
            }`, {good}
        )
    )
}
