import React, { useEffect , useState} from "react";
import axios from 'axios';
import M from 'materialize-css';
import { useHistory, Link } from 'react-router-dom'
import Resturant from './Resturant'
import { useSelector,useDispatch } from 'react-redux';
import './Dashboard.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Search.css'
import Homeside from './Homeside';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';


const Home =()=>{

    const history = useHistory()
    const dispatch = useDispatch();
    const {basket} = useSelector((state) => state.basket);
    const [restaurants, setRestaurants] = useState([])
    const [name, setName] = useState();
    const user = useSelector((state) => state.user);
    const [searchFlag, setSearchflag] = useState(false);
    const [searchData, setSearchdata] = useState([])
  //  const [mode, setMode] = useState("delivery");
    const [filterrestaurants, setFilteredRestaurants] = useState([]);
    const [filters, updateFilters] = useState({
        delivery: true,
        pickup: false,
        vegan: true,
        veg: true,
        nonVeg: true
      })
      const deliveryOrPickup = (delivery, pickup, rname) => {
        if (delivery === "Yes" && filters.delivery) {
          return true
        }
        else if (pickup === "Yes" && filters.pickup) {
          return true
        }
        else {
          return false
        }
      }
    
      console.log(restaurants);

    useEffect(()=>{

        getRestaurants()
        setFilteredRestaurants(
            restaurants
            .filter((restaurent) => (deliveryOrPickup(restaurent.delivery, restaurent.pickup, restaurent.rname)))
            .filter((restaurent) => (( filters.veg && restaurent.veg === "Yes" ) || ( filters.nonVeg && restaurent.nonVeg === "Yes" ) || ( filters.vegan && restaurent.vegan === "Yes" )))
          )
    }, [filters]);

    // useEffect(() => {

    //   }, [])

    const getRestaurants = async () =>{
        const cusCity = {
            city : user.user.city ? user.user.city : ''
        } 
        console.log("city", cusCity)
        await axios.post("http://localhost:8080/resturant/location", cusCity)
    //     .then((response) => 
    //   {
    //     return JSON.parse(response)
    //   })
        .then(responseData => {
            console.log("res",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
            }
            else {
                console.log('called')

                    //setcustomerData(responseData.data)
                    setRestaurants(responseData.data)
                    setFilteredRestaurants(
                        responseData.data
                        .filter((restaurent) => (deliveryOrPickup(restaurent.delivery, restaurent.pickup, restaurent.rname)))
                        .filter((restaurent) => (( filters.veg && restaurent.veg === "Yes" ) || ( filters.nonVeg && restaurent.nonVeg === "Yes" ) || ( filters.vegan && restaurent.vegan === "Yes" )))
                      )
                    console.log(responseData.data)
            }
        })

    }
    
    async function searchRestaurant (){
        setSearchflag(true)
        try{
            const sendS = {
                name: name
            }
            console.log(sendS)
           await axios.post("http://localhost:8080/dish/find",sendS)
        
            .then(responseData => {
                console.log("res",responseData);
                if (responseData.data.error) {
                    console.log("res",responseData);
                    M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
                }
                else {
                        setSearchdata(responseData.data)
                        console.log(responseData.data)
                }
            })
        }catch(err){
            console.log("error",err)
            console.log("in catch")
        }

    }
    console.log("filter resturants", filterrestaurants)
    console.log("filters",filters);
    return(
        <div > 
            <div className="search">
                <div className="search_icons">
                    <Homeside />
                </div>
                <div className="search_bar">
                    <div className="search_searchIcon"><SearchIcon  fontSize="large" /></div>
                    <input type="text" className="search_searchInput" placeholder="What are you craving?" value={name} onChange={(e) => setName(e.target.value)}/>
                    <button onClick={searchRestaurant} className="search_button">Search</button>
                    <Link to="/cart">
                    <div className="search_cart">
                        <div style={{padding:'5px'}}><ShoppingCartIcon/></div>
                        <h3>{basket && basket.length}</h3>
                    </div>
                    </Link>
                </div>
            </div>
           <div style={{display: 'flex', flexDirection: "row"}}>
           <div style={{height:'100vh',width:'200px',margin:'25px'}}>
                <div style={{borderBottom:'1px solid grey'}}>
                    <RadioGroup name="use-radio-group" defaultValue="delivery">
                    <FormControlLabel
                  value="delivery"
                  control={<Radio/>}
                  label="Delivery"
                  onChange={
                    (event) => updateFilters(
                      {...filters,
                        delivery: event.target.checked,
                        pickup: !event.target.checked,
                      }
                    )
                  }
                />
                        <FormControlLabel
                  value="pickup"
                  control={<Radio/>}
                  label="pickup"
                  onChange={
                    (event) => updateFilters(
                      {...filters,
                        delivery: !event.target.checked,
                        pickup: event.target.checked,
                      }
                    )
                  }
                />
                    </RadioGroup>
                </div>
                <div>
                <FormGroup>
                <FormControlLabel
                control={<Checkbox defaultChecked/>}
                label="veg"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      veg: event.target.checked
                    }
                  )
                }
              />
                    <FormControlLabel
                control={<Checkbox defaultChecked/>}
                label="nonVeg"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      nonVeg: event.target.checked
                    }
                  )
                }
              />
                   <FormControlLabel
                control={<Checkbox defaultChecked/>}
                label="Vegan"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      vegan: event.target.checked
                    }
                  )
                }
              />
                </FormGroup>
                </div>
           </div>
            <div>
            { searchFlag ? 
            <div className="res_home">
            {
                searchData.map(restaurant =>(
                    <Resturant key ={restaurant.restaurantId} resId = {restaurant.resturantId} Name ={restaurant.rname} Opens_at={restaurant.start} des={restaurant.cdes} imageKey={restaurant.profilepic}/>
                ))
            }
            </div>
                 :
                 <div className="res_home">
                {
                    filterrestaurants.map(rest =>(
                        <Resturant key ={rest.restaurantId} resId = {rest.resturantId} Name ={rest.rname} Opens_at={rest.start} des={rest.cdes} imageKey={rest.profilepic}/>
                    ))
                }
                </div>
            }   
            </div>
           </div>
        </div>
    )
}

export default Home;