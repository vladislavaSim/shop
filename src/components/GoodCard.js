import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {backendUrl} from "../graphQL/url";

const GoodCard = ({name, price, description, images, _id}) => {
    console.log(name)
    return (
        <>
            {_id && name && <Card sx={{width: '200px'}} className='card'>
                {images?.[0]?.url && <CardMedia
                    component="img"
                    alt="good image"
                    height="140"
                    image={backendUrl + images?.[0]?.url}
                />}
                <CardContent>
                    { name && <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>}
                    { description && <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>}
                    { price && <Typography gutterBottom variant="h6" component="div">
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