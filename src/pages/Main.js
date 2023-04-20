import React, {useEffect} from 'react';
import {CAllGoods} from "./AllGoods";
import {CSideMenu} from "./login/SideMenu";
import {Route, Routes, useLocation} from "react-router";
import {CNewGoodForm} from "../components/admin/NewGoodForm";
import {connect, useDispatch} from "react-redux";
import { CGoodInfoCard } from '../components/GoodInfoCard';
import { store } from '../redux/store';
import { getGoodsByCat } from '../graphQL/getCats';

const Main = ({categories, goodsByCat, getGoodsByCat}) => {

    const dispatch = useDispatch()
    const location = useLocation()
console.log(1);
    useEffect(() => {
        dispatch(() => getGoodsByCat(location.pathname.slice(1, location.pathname.length)))
    }, [])
    return (
        <>
            <main>
                <CSideMenu/>
              <div className='wrapper'>
                  <Routes>
                      {categories &&
                      categories.map((cat, key) => {
                          return <Route
                              path={cat.name.toLowerCase().replace(/\s+/g, '_')} //regex for replacing %20 by _ in a pathname
                              key={key}
                              element={<CAllGoods/>}/>
                      })}
                      {
                        goodsByCat &&
                        goodsByCat.map((good, key) => {
                                return <Route
                                    path={'/' + good?._id}
                                    key={key}
                                    element={<CGoodInfoCard good={good}/>}/>
                            })
                      }
                      <Route path='/createNewGood' element={<CNewGoodForm/>}/>
                      <Route path='/' element={<CAllGoods/>}/>
                  </Routes>
              </div>
            </main>
        </>
    );
};

export const CMain = connect((state) => ({
    categories: state?.promise?.allCats?.payload,
    goodsByCat: state?.promise?.goodsByCat?.payload?.goods
}), {
    getGoodsByCat: getGoodsByCat
})(Main);