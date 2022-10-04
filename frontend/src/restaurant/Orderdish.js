import React,{useState, useEffect} from 'react';
import Side from './Side';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Status from './Status';

const Orderdish = () => {
    const [dish, setDish] = useState([]);
    let {checkoutId} = useParams(); 
    useEffect(() => {
        getorder()
    },[])
    const getorder = () => {
        const checkId = {
            checkoutId: checkoutId
        }
        axios.post("http://localhost:8080/resturant/orderdish",checkId).then(responseData => {
            console.log("order dish page", responseData.data)
            setDish(responseData.data)
        })
    }
    return (
    <div>
        <div style={{display:'flex', flexDirection: "row", justifyContent:'space-between'}}>
                 <div >
                    <Side />
                </div>
                <div style={{backgroundColor:'#ededed',width:'600px'}}></div>
           </div>

        <div style={{display: 'flex', flexDirection: "row",justifyContent:'space-between'}}>
        <div style={{margin:'25px'}}>
        <h1 style={{marginLeft:'25px'}}>Ordered dish</h1>
            {
                dish.map((option) => (
                    <Card sx={{ display: 'flex', justifyContent:'space-between', width: '600px',margin:'25px'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {option.dname}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {option.ingredients}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    ${option.Price}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    qty:{option.quantity}
                                </Typography>
                            </CardContent>
                        </Box>
                        {option.profilepic &&
                            <CardMedia
                            component="img"
                            sx={{ width: 200}}
                            image={`http://localhost:8080/images/${option.profilepic}`}
                            alt="Live from space album cover"
                            />
                        }
                    </Card>
                ))
            }
        </div>
        <div style={{backgroundColor:'#ededed',width:'600px', height:'100vh',alignItems: 'center'}}>
            <Status checkoutId={checkoutId}/>
        </div>
        </div>
    </div>)
}



export default Orderdish;