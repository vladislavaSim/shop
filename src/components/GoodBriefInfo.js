import React from 'react';
import {backendUrl} from "../graphQL/url";

const GoodBriefInfo = ({good, count}) => {

    const {name, images} = good

    return (
        <div className='order-box' style={{flexGrow: '0.2'}}>
            <div>
                <img src={backendUrl + images[0]?.url} width='50px' height='auto'/>
            </div>
            <div>{name}</div>
            <div>{`${count} pcs`}</div>
        </div>
    );
};

export default GoodBriefInfo;