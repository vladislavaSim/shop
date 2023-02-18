import {applyMiddleware, combineReducers, createStore} from "redux";
import {promiseReducer} from "./reducers/promiseReducer";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/authReducer";
import {cartReducer} from "./reducers/cartReducer";

export const store = createStore(combineReducers({
    promise: promiseReducer,
    auth: authReducer,
    cart: cartReducer
}), applyMiddleware(thunk))