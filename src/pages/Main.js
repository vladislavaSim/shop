import React from 'react';
import {CAllGoods} from "./AllGoods";
import {CSideMenu} from "./login/SideMenu";

const Main = () => {
    return (
        <>
            <main>
                <CSideMenu/>
                <CAllGoods/>
            </main>
        </>
    );
};

export default Main;