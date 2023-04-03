import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {backendUrl} from "../graphQL/url";
import noImage from "../images/no-image-icon-23483.png"
import {connect} from "react-redux";
import {actionAddGood} from "../redux/actions/actionsCart";
import {ModalWindow} from "./Modal";
import { useEffect } from 'react';

const GoodCard = ({name, price, description, images, _id, categories, addToCart, good}) => {
    useEffect(() => {
        console.log(good);
    }, [good])
    return (
        <>
            {_id &&
            <Card sx={{width: '220px'}} className='card good-card'>
                {
                    <CardMedia
                    style={{margin: '0 auto', width: 'auto'}}
                    component="img"
                    alt="good image"
                    height="140"
                    image={images?.[0]?.url ? backendUrl + images?.[0]?.url : noImage}
                />
                }
                {
                    categories &&
                    <Typography variant="body2" color="text.secondary" style={{margin: '10px 10px 0'}}>
                        {categories?.[0]?.name}
                    </Typography>
                }
                <CardContent style={{paddingBottom: '0'}}>
                    { <Typography gutterBottom variant="h6" component="div">
                        {name?.slice(0, 30) }
                    </Typography>}
                    { <Typography variant="body2" color="text.secondary">
                        {description?.slice(0, 70)}
                    </Typography>}
                    {<Typography gutterBottom variant="h7" component="div">
                        {price + ' UAH' || null}
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