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
// export const getGoodsByCat = (name) => {
//     console.log(name)
//     return actionPromise('goodsByCat',
//         gql(`query GoodsByCat($name: String){
//               CategoryFindOne(query: $name) {
//                 name goods{
//                   _id, name, price, createdAt, description, images {
//                       _id
//                       url
//                     }
//                     categories {
//                         name
//                      }
//                 }
//               }
//             }`, {name: JSON.stringify([{name: `/${name}/`}])})
//     )
// }

export const getGoodsByCat = (name) =>
    async (dispatch) => {
        let promise = await actionPromise('goodsByCat',
            gql(`query GoodsByCat($name: String){
              CategoryFindOne(query: $name) {
                name goods{
                  _id, name, price, createdAt, description, images {
                      _id
                      url
                    }
                    categories {
                        name
                     }
                }
              }
        }`,
                //regex for good name searching
                {name: JSON.stringify([{name: `/${name}/`}] )}
            )
        )
        await dispatch(promise)
    }
