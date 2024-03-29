import './App.css';
import {CMain} from "./pages/Main";
import {CHeader} from "./pages/Header";
import {BrowserRouter} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getCatsQuery} from "./graphQL/getCats";
import {queryAllGoods} from "./graphQL/getGoodsQuery";

function App({getAll, getCats}) {
    const dispatch = useDispatch()

    //initial getting all categories
    useEffect(() => {
        dispatch(() => getCats())
        dispatch(() => getAll())
    }, [])
  return (
   <BrowserRouter>
       <div className="App">
           <CHeader/>
           <CMain/>
       </div>
   </BrowserRouter>
  );
}

export const CApp = connect(null, {
    getCats: getCatsQuery,
    getAll: queryAllGoods
})(App);
