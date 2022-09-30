import React , {useState} from 'react';
import Resd from './Resd.js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { loginResturant } from '../app/resActions';
import '../customer/Details.css'
import Respic from './Respic'
import Resshow from './Resshow'

const cuisiness = [
    {
      value: '1',
      label: 'Chinese',
    },
    {
      value: '2',
      label: 'Indian',
    },
    {
      value: '3',
      label: 'Mediterrian',
    },
    {
      value: '4',
      label: 'Lebanese',
    },
    {
        value: '5',
        label: 'Italian'
    },
    {
        value: '6',
        label: 'thai'
    },
    {
        value: '8',
        label: 'mexican'
    },
  ];

const dropd = [
    {
        value: 'Yes',
        label: 'Yes'
    },
    {
        value: 'No',
        label: 'No'
    }
];

const Resdetails = () => {
    const resturant = useSelector((state) => state.resturant);
    const dispatch = useDispatch();
    const [email, setEmail] = useState(resturant.resturant.email);
    const [name, setName] = useState(resturant.resturant.rname);
    const [mobileNo, setMobileNo] = useState(resturant.resturant.mobileNo);
    const [des, setDes] = useState(resturant.resturant.cdes);
    const [country, setCountry] = useState(resturant.resturant.country);
    const [city, setCity] = useState(resturant.resturant.city);
    const [region, setRegion] = useState(resturant.resturant.region);
    const [veg, setVeg] = useState(resturant.resturant.veg);
    const [nonVeg, setNonveg] = useState(resturant.resturant.nonVeg);
    const [vegan, setVegan] = useState(resturant.resturant.vegan);
    const [open, setOpen] = useState(resturant.resturant.open);
    const [close, setClose] = useState(resturant.resturant.close);
    const [pickup, setPickup] = useState(resturant.resturant.pickup);
    const [delivery, setDelivery] = useState(resturant.resturant.delivery);
    const [cuisine, setCuisine] = useState(resturant.resturant.cuisine);
    const [street, setStreet] = useState(resturant.resturant.street);
    const [message, setMessage] = useState();

    async function updatingDetails(event) {
        event.preventDefault();
       try{
        const sendDetails = {
            rname: name,
            email: email,
            mobileNo,
            cdes: des,
            country,
            city,
            region,
            cuisine,
            veg,
            nonVeg,
            open,
            close,
            delivery,
            pickup, 
            street,
            resturantId: resturant.resturant.resturantId
        }
        console.log("res data", sendDetails);
        dispatch(loginResturant({
            rname: name,
            email: email,
            mobileNo,
            cdes: des,
            country,
            city,
            region,
            cuisine,
            veg,
            nonVeg,
            open,
            close,
            delivery,
            pickup, 
            street,
            resturantId: resturant.resturant.resturantId
        }))
        const response = await axios.post("http://localhost:8080/resturant/updateDetails",sendDetails)
        console.log("respoionjnjfn", response)
        setMessage(response.data.message)
       }catch(err){
           console.log(err)
           console.log("incatch");
       }
    }

    return (
    <div>
        <Resd />
        <div className="details">
            <div className="details_title">
               <div className="details_edit">
                    <h1 className="details_customer">{resturant.resturant.rname}</h1>
               </div>
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
                        label="Name"
                        type="text"
                        defaultValue = {resturant.resturant.rname}
                        autoComplete="current-name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-email-input"
                        label="Email"
                        type="email"
                        autoComplete="current-email"
                        defaultValue = {resturant.resturant.email}
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="Enter mobile Number"
                        type="text"
                        autoComplete="current-mobile-number"
                        defaultValue = {resturant.resturant.mobileNo}
                        variant="filled"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="Opens at"
                        type="time"
                        autoComplete="current-opening-time"
                        defaultValue = {resturant.resturant.open}
                        variant="filled"
                        value={open}
                        onChange={(e) => setOpen(e.target.value)}
                    />

                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="Closes at"
                        type="time"
                        autoComplete="current-closing-time"
                        defaultValue = {resturant.resturant.close}
                        variant="filled"
                        value={close}
                        onChange={(e) => setClose(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-multiline-static"
                        label="About"
                        multiline
                        rows={4}
                        defaultValue = {resturant.resturant.cdes}
                        variant="filled"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                     <TextField style ={{width: "350px"}}
                        id="filled-email-input"
                        label="Street"
                        type="text"
                        autoComplete="current-email"
                        defaultValue = {resturant.resturant.street}
                        variant="filled"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-email-input"
                        label="City"
                        type="text"
                        autoComplete="current-email"
                        defaultValue = {resturant.resturant.city}
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
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        helperText="Please select your cuisine"
                        variant="filled"
                    >
                    {cuisiness.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>    
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={veg}
                        onChange={(e) => setVeg(e.target.value)}
                        helperText="Veg"
                        variant="filled"
                    >
                    {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField> 
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={nonVeg}
                        onChange={(e) => setNonveg(e.target.value)}
                        helperText="Non Veg"
                        variant="filled"
                    >
                    {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>  
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={vegan}
                        onChange={(e) => setVegan(e.target.value)}
                        helperText="Vegan"
                        variant="filled"
                    >
                    {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>  
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={delivery}
                        onChange={(e) => setDelivery(e.target.value)}
                        helperText="Delivery"
                        variant="filled"
                    >
                    {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>  
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        helperText="Pickup"
                        variant="filled"
                    >
                    {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>          
                     <Button variant="contained" className = "details_save" onClick={updatingDetails}>Save Changes</Button>
                     <p>{message}</p>
                    </div>
                </Box>
            </div>
            <div className="details_img">
                <Resshow /> 
                <Respic />
            </div>
        </div>  
    </div>
    )
}


export default Resdetails;