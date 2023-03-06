import React from 'react';
import {connect} from "react-redux";
import {Button, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {backendUrl} from "../graphQL/url";
import noImage from "../images/no-image-icon-23483.png";
import {actionAddGood} from "../redux/actions/actionsCart";
import Carousel from 'react-material-ui-carousel'
import {queryGoodDelete} from "../graphQL/admin/actionGood";

const GoodInfoCard = ({good, login, deleteGood, addToCart}) => {
    const {name, price, description, images, _id, categories} = good
    console.log(login)
    return (
        <>
            {_id && <div style={{width: '100%'}} className='card'>
                {images?.length === 1 ?
                    <CardMedia
                        style={{margin: '0 auto'}}
                        component="img"
                        alt="good image"
                        height="auto"
                        width='30%'
                        image={images?.[0]?.url ? backendUrl + images?.[0]?.url : noImage}
                    /> :
                    <Carousel
                        navButtonsAlwaysVisible={true}
                        swipe={false}
                        autoPlay={false}
                        navButtonsProps={{
                            style: {
                                backgroundColor: '#ffffff80',
                                color: 'grey'
                            }
                        }}>
                            {images?.length && images.map(image => {
                                return <img
                                    key={image?.url}
                                    src={backendUrl + image?.url} style={{height: '200px', display: 'flex', margin: '0 auto'}}/>
                            })}
                    </Carousel>
                }
                <CardContent style={{paddingBottom: '0'}}>
                    { categories && <Typography gutterBottom variant="h7" component="div">
                        {categories[0].name}
                    </Typography>}
                    { name && <Typography gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>}
                    { description && <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>}
                    { price && <Typography gutterBottom variant="h7" component="div">
                        {price + ' UAH'}
                    </Typography>}
                </CardContent>
                <CardActions>
                    {<Button size="small"
                               onClick={() => deleteGood({_id, name: name || null})}>
                        DELETE
                    </Button>
                    }
                    <Button size="small" onClick={() => addToCart(good)}>Add to cart</Button>
                </CardActions>
            </div>}
        </>
    );
};

export const CGoodInfoCard = connect((state) => ({
        allGoods: state?.promise?.allGoods?.payload,
        goodsByCat: state?.promise?.goodsByCat?.payload?.goods,
        goodsByName: state?.promise?.goodsByName?.payload,
        cart: state?.cart,
        login: state?.auth?.payload?.sub?.login
    }),
    {
        addToCart: actionAddGood,
        deleteGood: queryGoodDelete
    })
(GoodInfoCard)