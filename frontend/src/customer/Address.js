import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios';
import { Button } from '@mui/material';
import Dheader from './Dheader.js';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

const Address = () => {
    const user = useSelector((state) => state.user);
    const history = useHistory();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [region, setRegion] = useState();
    async function addAddress(event) {
        event.preventDefault();
        const sendAdd = {
            customerId : user.user.customerId,
            street: street,
            city: city,
            country: country,
            state: region
        }
        console.log("in Address", sendAdd);
        const res = await axios.post("http://localhost:8080/customer/address", sendAdd);
        console.log("response", res);
        if(res.data.message == 'Address updated'){
            history.push("/dashboard")
        }
    }
    return (
    <div>
    <Dheader />
        <div style={{margin:'25px'}}>
        <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                 }}
                noValidate
                 autoComplete="off"
                >
                    <div className="details_input">
                    <TextField
                        style ={{width: "350px"}}
                        id="filled-name-input"
                        label="Street"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        autoComplete="current-street"
                        variant="filled"
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-city-input"
                        label="City"
                        type="text"
                        autoComplete="current-city"
                        variant="filled"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                   <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)}
                        className="details_country"
                    />{" "}
                    <RegionDropdown
                        country={country}
                        value={region}
                        onChange={(val) => setRegion(val)}
                        className="details_region"
                     />            
                     <Button style={{ backgroundColor:'green', color:'white', width:'100px',height:'50px',border:'1px solid green'}} onClick={addAddress}>Add</Button>
                    </div>
                </Box>
        </div>
    </div>
    )
}


export default Address;