import React, {useState} from 'react';
import { useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import "../customer/Register.css";
import {useDispatch} from 'react-redux';
import { loginResturant } from '../app/resActions';

const Resregister = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email , setEmail ] = useState("");
    const [pwd , setPwd ] = useState("");
    const [rname , setName] = useState("");
    const [message, setMessage] = useState("");
    async function cusRegister(event) {
        event.preventDefault();
        try {
           const regAdmin = {
               email,
                rname,
                pwd,
            };
            console.log("------",regAdmin)
            const res = await axios.post("http://localhost:8080/resturant/register",regAdmin);
            setMessage(res.data.message);
            if(res.data.success == 1) {
                dispatch(loginResturant({
                    name: rname,
                    email: email,
                    resturantId: res.data.resturantId
                }))
            }
            console.log("response", res);
            history.push("/resdash");
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
    }

    return (
        <div className ="register_cen">
        <div className ="reg">
                <img className="register__logo" 
                src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
                alt=""
                />
            <div className ="register_wc">
                <h4>Let's get started</h4>
                <div className ="register__container">
                    <p>Enter your email, phone number and password(required)</p>
                    <form onSubmit={cusRegister}>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={rname} required></input>
                        <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required></input>
                        <button type="submit"  className="register__button">Next</button>
                    </form>
                    <div className="register__text">
                        <p>Already use Uber?</p>
                        <Link to="/login" className="register_ul"><p className="register__create">Sign in</p></Link>
                    </div>
                    <p>{message}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Resregister;