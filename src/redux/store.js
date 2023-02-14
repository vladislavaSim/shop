import {applyMiddleware, combineReducers, createStore} from "redux";
import {promiseReducer} from "./reducers/promiseReducer";
import thunk from "redux-thunk";

export const store = createStore(combineReducers({
    promise: promiseReducer
}), applyMiddleware(thunk))