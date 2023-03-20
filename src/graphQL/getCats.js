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
export const actionCatById = (_id) =>
    actionPromise(
        'catById',
        gql(
            `query CatById($q:String){
            CategoryFindOne(query: $q){
                _id name  
                goods{
                    _id name description price
                }
            }
        }`,
            { q: JSON.stringify([{ _id }]) }
        )

    );


export const getGoodsByCat = (name) =>
    async (dispatch) => {
        console.log(name)
        let promise = await actionPromise('goodsByCat',
            gql(`query GoodsByCat($name: String){
              CategoryFindOne(query: $name) {
                name goods{
                  _id, name, price, createdAt, description, images {
                      _id
                      url
                    }
                    categories {
                        name _id
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
