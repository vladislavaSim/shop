import {actionPromise} from "../redux/reducers/promiseReducer";
import {gql} from "./getgql";

export const queryAllGoods = () => {
    return actionPromise('allGoods',
        gql(`query allGoods{
          GoodFind(query: "[{}]") {
            _id, name, price, createdAt, description, images {
              _id
              url
            }
            categories {
                name
            }
          }
        }`)
      )
}
export const queryGoodsByName = (name) =>
    async (dispatch) => {
        let promise = await actionPromise(
            'goodsByName',
             await gql(`query GoodsByName($name: String){
          GoodFind(query: $name){
            _id, name, price, description, createdAt, images {
                    _id url
                 }
                 categories {
                     name
                 }
          }
        }`,
                 //regex for good name searching
            {name: JSON.stringify([{name: `/${name}/`}] )}
          )
      )
    await dispatch(promise)
}
