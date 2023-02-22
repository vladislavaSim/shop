import {actionPromise} from "../redux/reducers/promiseReducer";
import {gql} from "./getgql";

export const queryMakeNewOrder = (orderGoods) =>
    async (dispatch) => {
        let promise = await actionPromise(
            'newOrder',
            await gql(`mutation newOrder($order:OrderInput){
        OrderUpsert(order:$order){
         _id createdAt owner{
          _id login
        }
         orderGoods{
          _id count good {
           _id name price
          }
    }
   }
}`,
                { order: {orderGoods}  }
         )
        )
        await dispatch(promise)
}

export const queryOrdersByUser = (count, limit) =>
        async (dispatch) => {
            let promise = await actionPromise('orderFind',
                gql(`query orderFind($query: String!) {
                    OrderFind(query: $query) {
                        _id total createdAt orderGoods{
                            _id count good{
                                _id name description images{
                                    _id url
                                }
                            }
                        }
                    }
                }`,
                {
                    query: JSON.stringify([{}, {
                        sort: [{["createdAt"]: -1}],
                    }])
                }
                )
            )
            await dispatch(promise)
        }


    // export const actionFullOrderFind = (count=0, limit=100) =>
    //     async dispatch => {
    //         let value = await dispatch(queryOrdersByUserId(count, limit))
    //         if (value){
    //             dispatch(actionMyOrder(value))
    //         }
    //     }



