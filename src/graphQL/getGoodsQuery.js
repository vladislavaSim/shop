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
                name _id
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
                     name _id
                 }
          }
        }`,
                 //regex for good name searching
            {name: JSON.stringify([{name: `/${name}/`}] )}
          )
      )
    await dispatch(promise)
}
export const actionGoodById = (_id) =>
    actionPromise(
        'goodById',
        gql(
            `query GoodById($q:String){
            GoodFindOne(query: $q){
                _id name description price 
                categories{
                    _id name
                }
                images{
                    _id
                    url
                }
            }
        }`,
            { q: JSON.stringify([{ _id }]) }
        )

    );
