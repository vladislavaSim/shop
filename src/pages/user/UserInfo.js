import React from 'react';
import {connect} from "react-redux";
import {CardContent, Typography} from "@mui/material";

const UserInfo = ({user}) => {
    console.log(user)
    return (
        <div>
            {/*<CardContent style={{paddingBottom: '0'}}>*/}
            {/*    { user.login && <Typography gutterBottom variant="h6" component="div">*/}
            {/*        {user.login}*/}
            {/*    </Typography>}*/}
            {/*    { user.id && <Typography variant="body2" color="text.secondary">*/}
            {/*        {'id: ' + user.id}*/}
            {/*    </Typography>}*/}
            {/*    <h5>My orders: </h5>*/}
            {/*</CardContent>*/}
        </div>
    );
};

export const CUserInfo = connect((state) => ({
    user: state?.auth?.payload
}))(UserInfo);