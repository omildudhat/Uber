import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Side from './Side';
import {useSelector } from 'react-redux';
import Delivery from './Delivery';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const statusf = [
    {
        value: 'Order placed',
        label: 'Order placed'
    },
    {
        value: 'Preparing',
        label: 'Preparing'
    },
    {
        value: 'Ready for pickup',
        label: 'Ready for pickup'
    },
    {
        value: 'Completed',
        label: 'Completed'
    }
];

const Orders = () => {
    const resturant = useSelector((state) => state.resturant);
    const [order, setOrder] = useState([]);
    const [status, setStatus] = useState("Order placed");
    useEffect(() => {
        getOrder()
    }, [status])
    const getOrder = () => {
        const resId = {
            resturantId : resturant.resturant.resturantId,
            status: status
        }
        axios.post("http://localhost:8080/resturant/orderdetails",resId).then(responseData => {
            console.log("resturant order", responseData.data)
            setOrder(responseData.data)
        })
    }
    return (<div>
        <Side />
        <div style={{display: 'flex', flexDirection: "column"}}>
            <h1 style={{marginLeft:'25px'}}>Orders</h1>
            <TextField
            style ={{width: "400px",marginLeft:'25px'}}
            id="filled-select-status"
            select
            label="Select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            helperText="Change the status"
            variant="filled"
        >
        {statusf.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
        </TextField>
        </div>
        <div style={{display: 'flex', flexDirection: "column", width:'500px', margin:'25px'}}>
        {   
            order.map((option) => (
                <Delivery key={option.checkoutId} checkoutId={option.checkoutId} caddressId={option.caddressId} total={option.total} customerId={option.customerId} />
            ))
        }        
        </div>
    </div>)
}


export default Orders;