import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Button, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {backendUrl} from "../graphQL/url";
import noImage from "../images/no-image-icon-23483.png";
import {actionAddGood} from "../redux/actions/actionsCart";
import Carousel from 'react-material-ui-carousel'
import {queryGoodDelete} from "../graphQL/admin/actionGood";
import {ModalWindow} from "./Modal";
import Confirm from './Confirm';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CGoodCard } from './GoodCard';

const GoodInfoCard = ({good, login, deleteGood, addToCart, promise, otherGoods}) => {
    const {name, price, description, images, _id, categories} = good
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if(promise?.goodDelete?.status === 'RESOLVED') {
            window.location.reload()
        }
    }, [promise])

    // console.log(store.getState());
    console.log(categories);
    return (
        <>
        <Button onClick={() => navigate(-1)}>back</Button>
            {_id && <div style={{width: '100%'}} className='card'>
                {images?.length === 1 ?
                    <CardMedia
                        style={{margin: '0 auto', height: '200px', width: 'auto'}}
                        component="img"
                        alt="good image"
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
                    { categories?.length && <Typography gutterBottom variant="h7" component="div">
                        {categories?.[0]?.name}
                    </Typography>}
                    { name && <Typography gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>}
                    { price && <Typography gutterBottom variant="h7" component="div">
                        {price + ' UAH'}
                    </Typography>}
                    <CardActions style={{justifyContent: "space-around"}}>
                        <Button size="small" onClick={() => addToCart(good)}>Add to cart</Button>
                        { login === 'admin' &&
                        <>
                                               
                {isDeleteModalOpen ? 
                <Confirm
                    open={isDeleteModalOpen}
                    text="Delete the good?"
                    onClose={() => setIsDeleteModalOpen(false)}
                    onNO={() => setIsDeleteModalOpen(false)}
                    onYES={() => deleteGood({_id, name: name || null})}
                    
                /> :
                 <Button size="small"
                         onClick={() => setIsDeleteModalOpen(true)}>
                                DELETE
                 </Button>
            }
            
                           
                            <ModalWindow modalType='edit good' width={700} good={good}>
                                <Button size="small">Edit</Button>
                            </ModalWindow>
                        </>
                        }
                    </CardActions>
                    { description && <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>}
                </CardContent>
            </div>
            }
            <div className='recommended-goods'>
                 {otherGoods && otherGoods.slice(0, 4).map((good) => {
                    return <CGoodCard
                                good={good}
                                categories={[good.categories?.[0]]}
                                key={good._id}
                                name={good.name}
                                images={good.images}
                                price={good.price}
                                _id={good._id}
                                createdAt={good.createdAt}/>
                 })}
            </div>
        </>
    );
};

export const CGoodInfoCard = connect((state) => ({
        promise: state?.promise,
        login: state?.auth?.payload?.sub?.login,
        otherGoods: state?.promise?.goodsByCat?.payload?.goods,
    }),
    {
        addToCart: actionAddGood,
        deleteGood: queryGoodDelete,
    })
(GoodInfoCard)