// import {actionMakeNewOrder} from "../../graphQL/queryOrder";

import {queryMakeNewOrder} from "../../graphQL/queryOrder";
import {clearPromiseByName} from "./actionsPromise";

export const actionAddGood = (good) => {
    return {type: 'ADD_GOOD', good}
}
export const actionRemoveGood = (good) => {
    return {type: 'REMOVE_GOOD', good}
}
export const actionClearCart = () => {
    return {type: 'CLEAR_CART'}
}
export const actionChangeGoodCount = (good, count) => {
    return {type: 'UPDATE_CART', good, count}
}
// export const actionOrderUpdate = (order) => {
//     return { type: "ORDER_UPDATE", payload: order }
// }

export const actionFullNewOrder = (order) =>
    async (dispatch) => {
        await dispatch(queryMakeNewOrder(order))
        await dispatch(actionClearCart())
        await dispatch(clearPromiseByName('newOrder'))
    }