import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {CardContent, Typography} from "@mui/material";
import {findUserById} from "../../graphQL/queryUser";
import {store} from "../../redux/store";
import {queryOrdersByUser} from "../../graphQL/queryOrder";
import OrdersList from "../orders/OrdersList";

const UserInfo = ({myId, userById, user, queryOrdersByUser, myOrders}) => {
    // console.log(myId)
    // console.log(myOrders)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(() => userById(myId))
        dispatch(() => queryOrdersByUser(5, 5))
    }, [])
    // console.log(store.getState())

    return (
        <div>
            <CardContent style={{paddingBottom: '0'}}>
                { user.login && <Typography gutterBottom variant="h6" component="div">
                    {user.login}
                </Typography>}
                { user.id && <Typography variant="body2" color="text.secondary">
                    {'id: ' + user.id}
                </Typography>}
                <h5>My orders:
                    {myOrders && <OrdersList orders={myOrders}/>}
                </h5>
            </CardContent>
        </div>
    );
};

export const CUserInfo = connect((state) => ({
    myId: state?.auth?.payload?.sub?.id,
    myOrders: state?.promise?.orderFind?.payload,
    user: state?.auth?.payload?.sub
}), {
    queryOrdersByUser: queryOrdersByUser,
    userById: findUserById
})(UserInfo);