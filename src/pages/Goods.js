import React from 'react';
import {CGoodCard} from "../components/GoodCard";

const Goods = ({goods}) => {
    return (
        <div className='card-holder'>
            {
                goods.map(({_id, name, price, categories, description, images, createdAt}) => {
                    return <CGoodCard
                                categories={[categories?.[0]]}
                                key={_id}
                                name={name}
                                images={images}
                                price={price}
                                description={description}
                                _id={_id}
                                createdAt={createdAt}/>
                })
            }
        </div>
    );
};

export default Goods;