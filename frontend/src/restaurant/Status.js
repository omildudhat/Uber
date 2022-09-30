import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Delivery = ({key, checkoutId, caddressId, resturantId, customerId, total}) => {
    const [customer, setCustomer] = useState();
    useEffect(() => {
        getAddress()
    }, [])
    const getAddress = () => {
        const addId = {
            caddressId: caddressId,
        }
        axios.post("http://localhost:8080/resturant/customerAddress",addId).then(responseData => {
            console.log("delivery page", responseData.data[0])
            setCustomer(responseData.data[0])
        })
    }
    return (<div style={{margin:'25px'}}>
        <Link to={{pathname:`/orderdish/${checkoutId}`}} style={{textDecoration: 'none'}}>
        <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total: ${total}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {customer?.cname ? customer.cname : ''}
                    </Typography>
                   <div style={{display: 'flex', flexDirection: "row"}}>
                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Delivery Address:
                    </Typography>
                    <Typography variant="body2" style={{marginLeft:'25px'}}>
                    {customer?.street}
                    <div style={{display: 'flex', flexDirection: "row", marginTop:'-15px'}}>
                    <p>{customer?.city},</p>
                    <p style={{marginLeft:'5px'}}>{customer?.state}</p>
                    </div>
                    <p style={{marginTop:'-15px'}}>{customer?.country}</p>
                    <br />
                    </Typography>
                   </div>
                </CardContent>
            </Card>
        </Link>
    </div>)
}



export default Delivery;