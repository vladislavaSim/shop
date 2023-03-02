import './App.css';
import Main from "./pages/Main";
import {CHeader} from "./pages/Header";
import Footer from "./pages/Footer";
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
           <Main/>
           <Footer/>
       </div>
   </BrowserRouter>
  );
}

export const CApp = connect(null, {
    getCats: getCatsQuery,
    getAll: queryAllGoods
})(App);
