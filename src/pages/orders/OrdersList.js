import React from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getDate} from "../../DateFormating";
import {ModalWindow} from "../../components/Modal";


const OrdersList = ({orders}) => {

    console.log(orders)
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Items number</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="center">Goods</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(({total, _id, createdAt, orderGoods}) => (
                            <TableRow
                                key={_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {getDate(createdAt)}
                                </TableCell>
                                <TableCell align="center">{orderGoods.length}</TableCell>
                                <TableCell align="right">{total + ' UAH'}</TableCell>

                                <TableCell align="center">{orderGoods.map((order, key) => {
                                    return <ModalWindow modalType='good' width={900} good={order.good}>
                                        <div key={key}>
                                            {order.good.name.length > 15 ? order.good.name.slice(0, 15) + '...' : order.good.name}
                                            <span>{' ' + order.count + ' PCS'}</span>
                                        </div>


                                        </ModalWindow>
                                })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*<div className='order-box'>*/}
            {/*    <div>total</div>*/}
            {/*    <div>date</div>*/}
            {/*    <div>goods</div>*/}
            {/*</div>*/}
            {/*{orders.map(({total, _id, createdAt, orderGoods}) => {*/}
            {/*    return <OrderInfo*/}
            {/*        total={total}*/}
            {/*        key={_id}*/}
            {/*        createdAt={createdAt}*/}
            {/*        goods={orderGoods}/>*/}
            {/*})}*/}
        </>
    );
};

export default OrdersList;