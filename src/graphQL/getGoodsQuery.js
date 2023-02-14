
import {actionPromise} from "../redux/reducers/promiseReducer";
import {gql} from "./getgql";

export const queryAllGoods = () => {
    return actionPromise('allGoods',
        gql(`query allGoods{
          GoodFind(query: "[{}]") {
            _id, name, price, description, images {
              _id
              url
            }
          }
        }`)
      )
}