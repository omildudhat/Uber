import React, {useState, useEffect}from 'react';
import axios from 'axios';

const Deliveryaddress = ({street,city,state,country, status, total, date}) => {
    
    return (
                <div style={{marginLeft:'100px', marginTop:'100px'}}>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                    <p><b>Delivered Address:</b></p>
                    <div style={{display: 'flex', flexDirection: "column"}}>
                    <div style={{marginLeft:'10px', display: 'flex', flexDirection: "row", marginBottom:'-30px'}}>
                    <p>{street},</p>
                    <p style={{marginLeft:'5px'}}>{city}</p>
                    </div>
                    <div style={{marginLeft:'10px', display: 'flex', flexDirection: "row"}}>
                    <p>{state},</p>
                    <p style={{marginLeft:'5px'}}>{country}</p>
                    </div>
                    </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                    <p><b>Status:</b></p>
                    <p style={{marginLeft:'5px'}}>{status}</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                    <p><b>Total:</b></p>
                    <p style={{marginLeft:'5px'}}>${total}</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                    <p><b>Date:</b></p>
                    <p style={{marginLeft:'5px'}}>{date}</p>
                    </div>
                </div>
          
        
    )
}



export default Deliveryaddress;