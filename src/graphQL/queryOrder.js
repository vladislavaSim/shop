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
