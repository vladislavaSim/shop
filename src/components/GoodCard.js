import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {backendUrl} from "../graphQL/url";
import noImage from "../images/no-image-icon-23483.png"
import {connect} from "react-redux";
import {actionAddGood} from "../redux/actions/actionsCart";
import {store} from "../redux/store";
import {ModalWindow} from "./Modal";

const GoodCard = (good) => {
 const {name, price, description, images, _id, addToCart, cat} = good
    // console.log(store.getState())
    // console.log(cat)

    return (
        <>
            {_id && name && price && <Card sx={{width: '220px'}} className='card'>
                {<CardMedia
                    style={{margin: '0 auto'}}
                    component="img"
                    alt="good image"
                    height="140"
                    image={images?.[0]?.url ? backendUrl + images?.[0]?.url : noImage}
                />}
                { cat && <Typography variant="body2" color="text.secondary">
                    {cat?.name}
                </Typography>}
                <CardContent style={{paddingBottom: '0'}}>
                    { name && <Typography gutterBottom variant="h6" component="div">
                        {name.slice(0, 30) + '...'}
                    </Typography>}
                    { description && <Typography variant="body2" color="text.secondary">
                        {description.slice(0, 70) + '...'}
                    </Typography>}
                    { price && <Typography gutterBottom variant="h7" component="div">
                        {price + ' UAH'}
                    </Typography>}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => addToCart(good)}>Add to cart</Button>
                    <ModalWindow modalType='good' width={700} good={good}>
                        <Button size="small">Learn More</Button>
                    </ModalWindow>
                </CardActions>
            </Card>}
        </>
    );
};

export const CGoodCard = connect(null, {
    addToCart: actionAddGood
})(GoodCard);