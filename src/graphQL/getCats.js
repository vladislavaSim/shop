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
export const getGoodsByCat = (name) => {
    return actionPromise('goodsByCat',
        gql(`query GoodsByCat($name: String){
              CategoryFindOne(query: $name) {
                name goods{
                  _id, name, price, createdAt, description, images {
              _id
              url
            }
                }
              }
            }`, {name: JSON.stringify([{name: `/${name}/`}])})
    )
}
