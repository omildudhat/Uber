import React,{useState,useEffect} from 'react';
import Side from './Side'
import './Dash.css'
import Showdish from './Showdish'
import axios from 'axios';
import { useSelector } from 'react-redux';


const Dash = () => {
    const resturant = useSelector((state) => state.resturant);
    const [dishes, setDishes] = useState([]);

    useEffect(()=>{
        getDishes()
    }, []);

    const getDishes = async () =>{
        const resId = {
            resturantId : resturant.resturant?.resturantId ? resturant.resturant?.resturantId : ''
        } 
        await axios.post("http://localhost:8080/dish/findresturant", resId)
        .then(responseData => {
            console.log("res",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
            }
            else{
                    setDishes(responseData.data)
                    console.log(responseData.data)
            }
        })

    }

    return (
        <div>
            <div className="dash">
                <Side />
            </div>
            <h1 style={{marginLeft:'25px'}}>{resturant.resturant.rname}</h1>
            <div style={{display:"flex", flexDirection:"row"}}>
            {
                dishes.map(dish =>(
                    <Showdish key ={dish.dishId} dishId = {dish.dishId} des={dish.rdes} Name ={dish.dname} price={dish.Price} imageKey={dish.profilepic} ingredients={dish.ingredients} cuisine={dish.cuisineId} category={dish.categoryId}/>
                ))
            }
            </div>
        </div>
        
    )
}



export default Dash;