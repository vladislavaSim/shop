import React, {useEffect} from 'react';
import {CAllGoods} from "./AllGoods";
import {CSideMenu} from "./login/SideMenu";
import {Route, Routes} from "react-router";
import {CNewGoodForm} from "../components/admin/NewGoodForm";
import {connect} from "react-redux";
import { CGoodInfoCard } from '../components/GoodInfoCard';
import { store } from '../redux/store';

const Main = ({categories, goodsByCat}) => {
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
}))(Main);