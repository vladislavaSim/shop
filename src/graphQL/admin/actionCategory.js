import {actionPromise} from "../../redux/reducers/promiseReducer";
import {gql} from "../getgql";

export const actionCategoryUpsert = (category) => {
    return actionPromise(
        "categoryUpsert",
        gql(
            `mutation CatUpsert($category:CategoryInput!){
                    CategoryUpsert(category:$category){
                        _id name
                        parent{
                            _id, name
                        }
                        subcategories{
                            _id name
                        }
                        goods{
                            _id name price amount
                        }
                    }
                }`,
            {category}
        )
    )
}
export const queryCatDelete = (category) => {
    console.log(category)
    return actionPromise('goodDelete',
        gql(`mutation removeCat($category: CategoryInput!){
             CategoryDelete(category:$category){
                    _id name
                }
            }`, {category}
        )
    )
}