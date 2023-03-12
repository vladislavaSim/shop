import React from 'react';
import {CGoodCard} from "../components/GoodCard";

const Goods = ({goods}) => {
    return (
        <div className='card-holder'>
            {
                goods.map((good) => {
                    return <CGoodCard
                                good={good}
                                categories={[good.categories?.[0]]}
                                key={good._id}
                                name={good.name}
                                images={good.images}
                                price={good.price}
                                description={good.description}
                                _id={good._id}
                                createdAt={good.createdAt}/>
                })
            }
        </div>
    );
};

export default Goods;