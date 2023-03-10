import React, {useEffect} from 'react';
import {CAllGoods} from "./AllGoods";
import {CSideMenu} from "./login/SideMenu";
import {Route, Routes} from "react-router";
import {CNewGoodForm} from "../components/admin/NewGoodForm";
import {useDispatch} from "react-redux";
import {queryAllGoods} from "../graphQL/getGoodsQuery";

const Main = () => {

    return (
        <>
            <main>
                <CSideMenu/>
              <div className='wrapper'>
                  <Routes>
                      <Route path='/createNewGood' element={<CNewGoodForm/>}/>
                      <Route path='/' element={<CAllGoods/>}/>
                  </Routes>
              </div>
            </main>
        </>
    );
};

export default Main;