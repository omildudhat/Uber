import React, {useState} from 'react';
import './Reslogin.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { loginResturant } from '../app/resActions';


const Reslogin = () => {
    const dispatch = useDispatch();
    const [email , setEmail ] = useState("");
    const [pwd , setPwd ] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();
    
    async function cuslogin(event) {
        event.preventDefault();
        try {
            const loginRes = {
                email,
                pwd,
            };
            console.log("------",loginRes)
            const res = await axios.post("http://localhost:8080/resturant/login",loginRes);
            localStorage.setItem('token', res.data.token);
            console.log("name", res.data.rname)
            setMessage(res.data.message)
            if(res.data.success == 1) {
                dispatch(loginResturant({
                    email: res.data.email,
                    resturantId: res.data.id,
                    rname: res.data.name,
                    loggedIn: true, 
                    mobileNo: res.data.details.mobileNo,
                    cdes: res.data.details.cdes,
                    country: res.data.details.country,
                    city: res.data.details.city,
                    region: res.data.details.state,
                    cuisine: res.data.details.cuisineId,
                    veg: res.data.details.veg,
                    nonVeg: res.data.details.nonVeg,
                    open: res.data.details.start,
                    close:res.data.details.close,
                    delivery: res.data.details.delivery,
                    pickup: res.data.details.pickup, 
                    street : res.data.details.street
                }))
              history.push("/resdash")
            }
            console.log("response", res);
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
    }

    return(
    <div className ="res_login_cen">
    <div className ="res_logi">
            <img className="res_login__logo" 
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
            alt=""
            />
        <div className ="res_login_wc">
            <h4>Welcome back</h4>
            <div className ="res_login__container">
                <p>Sign in with your email and password</p>
                <form onSubmit={cuslogin}>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                    <button type='submit' className="res_login__button">Next</button>
                </form>
                <div className="res_login__text">
                    <p>New to Uber?</p>
                    <Link to="/resregister" className="res_login_ul"><p className="res_login__create">Create an account</p></Link>
                </div>
                <p>{message}</p>
            </div>
        </div>
    </div>
    </div>
    )
}


export default Reslogin;