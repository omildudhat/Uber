import React, {useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Dheader from './Dheader.js';
import './Details.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Showprofile from './Showprofile';
import Profilepic from './Profilepic';
import { loginSuccess } from '../app/actions';

const Details = () => {
    const user = useSelector((state) => state.user);

    const history = useHistory();
    const dispatch = useDispatch();
    const [mobileNo, setMobileNo] = useState(user.user.mobileNo);
    const [email , setEmail] = useState(user.user.email);
    const [name, setName] = useState(user.user.name);
    const [DOB, setDOB] = useState(user.user.DOB)
    const [about, setAbout] = useState(user.user.about)
    const [nickname, setNickname] = useState(user.user.nickname)
    const [city, setCity] = useState(user.user.city)
    const [country, setCountry] = useState(user.user.country)
    const [region, setRegion] = useState(user.user.region)
    const [message, setMessage] = useState()
    async function updatingDetails(event) {
        event.preventDefault();
        try {
            const sendDetails = {
                cname : name,
                email : email,
                DOB,
                nickname,
                mobileNo,
                customerId : user.user.customerId,
                about,
                country,
                city,
                region
            }
            console.log("about", sendDetails)
            dispatch(loginSuccess({
                name : name,
                email : email,
                DOB : DOB,
                nickname : nickname,
                mobileNo : mobileNo,
                customerId : user.user.customerId,
                about : about,
                country : country,
                city : city,
                region : region
            }))
            console.log("try", sendDetails)
            const response = await axios.post("http://localhost:8080/updateDetails",sendDetails)
            console.log("response", response);
            setMessage(response.data.message)
        }catch(err) {
            console.log(err);
            console.log("incatch");
        }

    }
    return (
        <div>
        <Dheader />
        <div className="details">
            <div className="details_title">
               <div className="details_edit">
                    <h1 className="details_customer">{user.user.cname}</h1>
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
                        autoComplete="current-name"
                        defaultValue = {user.user.name}
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-email-input"
                        label="Email"
                        type="email"
                        defaultValue = {user.user.email}
                        autoComplete="current-email"
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="Enter mobile Number"
                        type="text"
                        autoComplete="current-mobile-number"
                        defaultValue = {user.user.mobileNo}
                        variant="filled"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="Date of birth"
                        type="date"
                        autoComplete="current-DOB"
                        defaultValue = {user.user.DOB}
                        variant="filled"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-password-input"
                        label="NickName"
                        type="text"
                        autoComplete="current-password"
                        defaultValue = {user.user.nickname}
                        variant="filled"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-multiline-static"
                        label="About"
                        multiline
                        rows={4}
                        variant="filled"
                        defaultValue = {user.user.about}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-email-input"
                        label="City"
                        type="text"
                        autoComplete="current-email"
                        defaultValue = {user.user.city}
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
                        defaultValue = {user.user.region}
                        onChange={(val) => setRegion(val)}
                        className="details_region"
                     />            
                     <Button variant="contained" className = "details_save" onClick={updatingDetails}>Save Changes</Button>
                    <p>{message}</p>
                    </div>
                </Box>
            </div>
            <div className="details_img">
                <Showprofile /> 
                <Profilepic />
            </div>
        </div>  
    </div>
    )
}

export default Details;