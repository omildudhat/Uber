import React from 'react';
import '../customer/Dheader.css'
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Resd = () => {
    const resturant = useSelector((state) => state.resturant);
    return (
        <div className="nav">
            <div className="nav__title">
                <Link to='/resdash' style={{textDecoration:'none', color:'white'}}><h2>Uber</h2></Link>
            </div>
            <div className="nav_fun">
                <h4>Help</h4>
                <h4>{resturant.resturant.rname}</h4>
            </div>
        </div>
    )
}


export default Resd;