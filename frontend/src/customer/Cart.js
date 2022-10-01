import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Homeside from './Homeside';
import Items from './Items';
import Order from './Order';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const dropd = [
    {
        value: 'delivery',
        label: 'Delivery'
    },
    {
        value: 'pickup',
        label: 'Pickup'
    }
];
const Cart = () => {
    
    const {basket} = useSelector((state) => state.basket);
    const user = useSelector((state) => state.user);
    const [address, setAddress] = useState([]);
    const [value, setValue] = React.useState(0);
    const [mode, setMode] = useState();
    const handleChange = (event) => {
        console.log("Inside handleChange")
        setValue(event.target.value);
    };

    useEffect(() => {
        const getAddress = () => {
            console.log("show address", user.user.customerId)
            const cusId = {
                customerId : user.user.customerId
            }
            axios.post("http://localhost:8080/customer/getAddress", cusId).then(responseData => {
                console.log("response", responseData)
                setAddress(responseData.data)
            })
        }
        getAddress()
    }, [])
    return (
        <div>
           <div style={{display:'flex', flexDirection: "row", justifyContent:'space-between'}}>
                 <div >
                    <Homeside />
                </div>
                <div style={{backgroundColor:'#ededed',width:'600px'}}></div>
           </div>
            <div style ={{display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
                <div>
                    <div style={{marginRight:'200px'}}>
                        <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between',width:'500px'}}>
                        <TextField
                        style ={{width: "250px", marginLeft:'25px'}}
                        id="filled-select-cuisine"
                        select
                        label="Select the mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        variant="filled"
                        >
                        {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                         </TextField> 
                        </div>
                    <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between',width:'500px'}}>
                        <h3 style={{marginLeft:'25px'}}>Select delivery Address</h3>
                        <Link to="address" style={{textDecoration:'none'}}><div style={{ backgroundColor:'#ededed',height:'45px',padding:'10px',borderRadius:'25px',color:'black',marginTop:'10px'}}>+ Add Address</div></Link>
                        </div>
                        { mode == 'delivery' ? 
                            <div style={{display: 'flex', flexDirection: "column", marginLeft:'25px'}}>
                            {   
                                    address.map(option => (
                            <form  value={value}
                                    onChange={handleChange}>
                                <input type="radio" id={option.caddressId} value={option.caddressId} name="address"/>
                                <div style={{display: 'flex', flexDirection: "row"}}>
                                    <label for={option.caddressId} style={{marginLeft:'25px',marginTop:'-25px'}}>{option.street}</label>
                                    <p style={{marginTop:'-26px',marginLeft:'5px'}}>, {option.city},</p>
                                </div>
                                <div style={{display: 'flex', flexDirection: "row"}}>
                                    <p style={{marginTop:'-15px',marginLeft:'25px'}}>{option.state},</p>
                                    <p style={{marginTop:'-15px', marginLeft:'5px'}}>{option.country}</p>
                                </div>
                            </form>
                             ))
                            }
                            </div> :
                            <p></p>
                        }
                    </div>
                    <div >
                        <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between',width:'500px'}}>
                            <h2 style={{marginLeft:'25px',marginBottom:'-20px'}}>Your items</h2>
                            {
                                basket.length == 0 ? <Link to='/dashboard' style={{textDecoration:'none'}}><div style={{ backgroundColor:'#ededed',height:'45px',padding:'10px',borderRadius:'25px',color:'black',marginTop:'10px'}}>+ Add items</div></Link>
                                : <Link to={{ pathname:`/showres/${basket[0].resturantId}`}} style={{textDecoration:'none'}}><div style={{ backgroundColor:'#ededed',height:'45px',padding:'10px',borderRadius:'25px',color:'black',marginTop:'10px'}}>+ Add items</div></Link>
                            }
                            </div>
                    {   basket.length == 0
                        ? <h1 style={{marginLeft:'25px'}}>Your Cart is empty</h1>
                        :
                        basket.map(cart => (
                            <Items id={cart.dishId} cartId = {cart.cartId} disId={cart.dishId} name={cart.name} ingredients={cart.ingredients} price={cart.price} quantity={cart.quantity} imageKey={cart.imageKey} />
                        ))
                    }
                    </div>
                    
                </div>
                <div style={{backgroundColor:'#ededed',width:'600px', height:'100vh',minHeight:'100%',alignItems: 'center'}}>
                   { basket.length == 0 ? <p style={{marginLeft:'25px'}}>Your cart is empty</p> : <Order caddressId={value} delivery={mode == 'delivery' ? 'Yes' : ''} pickup={mode == 'pickup' ? 'Yes' : ''}/>} 
                </div>
            </div>
        </div>
    )
}

export default Cart;