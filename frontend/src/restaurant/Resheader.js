import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import './Resheader.css'

const Resheader = () => {
    
    return (
        <div className="res_header">
            <div className="resh_icons">
                <MenuIcon style={{marginRight:10}}/>
                <img className="resh__logo" 
                    src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
                    alt=""
                />
            </div> 
        </div>
    )
}


export default Resheader;