import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {backendUrl} from "../graphQL/url";
import noImage from "../images/no-image-icon-23483.png"

const GoodCard = ({name, price, description, images, _id}) => {
    console.log(name)
    return (
        <>
            {_id && name && price && <Card sx={{width: '220px'}} className='card'>
                {<CardMedia
                    component="img"
                    alt="good image"
                    height="140"
                    image={images?.[0]?.url ? backendUrl + images?.[0]?.url : noImage}
                />}
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
                    <Button size="small">Add to cart</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>}
        </>
    );
};

export default GoodCard;