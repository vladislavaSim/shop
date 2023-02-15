import React from 'react';
import logo from '../images/logot.png'

const Header = () => {
    return (
        <header>
            <div>
                <img src={logo} alt="logo" className={'logo'}/>
            </div>

            {/*<nav>*/}
            {/*        <p>goods*/}
            {/*            <p>toys</p>*/}
            {/*               <p>food</p>*/}
            {/*               <p>sport</p>*/}
            {/*        </p>*/}
            {/*        <p>contacts</p>*/}
            {/*        <p>something</p>*/}
            {/*        <p>else</p>*/}
            {/*</nav>*/}
        </header>
    );
};

export default Header;