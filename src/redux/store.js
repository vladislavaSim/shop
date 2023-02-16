import {applyMiddleware, combineReducers, createStore} from "redux";
import {promiseReducer} from "./reducers/promiseReducer";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/authReducer";

export const store = createStore(combineReducers({
    promise: promiseReducer,
    auth: authReducer
}), applyMiddleware(thunk))