import {actionPromise} from "../../redux/reducers/promiseReducer";
import {gql} from "../getgql";

export const actionCategoryUpsert = (category) => {
    console.log(category)
    return actionPromise(
        "categoryUpsert",
        gql(
            `mutation CatUpsert($category:CategoryInput!){
                    CategoryUpsert(category:$category){
                        _id name
                        parent{
                            _id, name
                        }
                        subCategories{
                            _id name
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