import {actionPromise} from "../../redux/reducers/promiseReducer";
import {gql} from "../getgql";

export const queryGoodUpsert = (good) => {
    console.log(good)

    return actionPromise('orderUpsert',
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
