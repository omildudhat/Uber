import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const Showdish = ({key, dishId, Name, imageKey, ingredients, nonVeg, vegan, veg, price, des, cuisine, category}) => {
  const history = useHistory();
    const resturant = useSelector((state) => state.resturant);
    async function deldish() {
        try {
            const deld = {
                dishId: dishId,
                resturantId: resturant.resturant.resturantId
            }
            const res = await axios.post("http://localhost:8080/dish/delete",deld)
            console.log(res)
        }
        catch(err) {
            console.log(err)
            console.log("in catch")
        }
    }
    function editdish(){
      history.push({
        pathname: '/editdish',
        state : { diId: dishId ,Name: Name,ingredients: ingredients, nonVeg: nonVeg, vegan:vegan, veg:veg, price: price, cuisine:cuisine, category: category, des:des}
      })
    }
    return <div style={{margin:"25px"}}>
        <Card sx={{ maxWidth: 345 }}>
            {imageKey && 
                <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                image={`http://localhost:8080/images/${imageKey}`}
              />
            }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ingredients}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={editdish}>edit</Button>
        <Button size="small" onClick={deldish}>Delete</Button>
      </CardActions>
    </Card>
    </div>;
}


export default Showdish;