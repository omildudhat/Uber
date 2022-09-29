import './App.css';
import Login from './customer/Login';
import Home from './customer/Home'
import Register from './customer/Register'
import Details from './customer/Details'
import Dashboard from './customer/Dashboard'
import Reslogin from './resturant/Reslogin'
import Resdetails from './resturant/Resdetails'
import Resregister from './resturant/Resregister'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dash from './resturant/Dash'
import Dish from './resturant/Dish'
import Editpic from './resturant/Editdish'
import Showres from './customer/Showres'
import Favourite from './customer/Favourite'
import Cart from './customer/Cart';
import Address from './customer/Address'
import Orders from './resturant/Orders'
import Orderdish from './resturant/Orderdish';
import Orderdishes from './customer/Orderdishes';
import Pastorders from './customer/Pastorders';

function App() {

  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/resdash'>
            <Dash />
          </Route>
          <Route path='/pastorders'>
            <Pastorders />
          </Route>
          <Route path="/address">
            <Address />
          </Route>
          <Route path='/resOrders'>
            <Orders />
          </Route>
          <Route path='/orderdishes/:checkoutId'>
            <Orderdishes />
            </Route>
          <Route path='/orderdish/:checkoutId'>
            <Orderdish />
          </Route>
          <Route path='/addish'>
            <Dish />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
          <Route path='/fav'>
            <Favourite />
            </Route>
          <Route exact path='/showres/:resId'>
            <Showres />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/editdish'>
            <Editpic />
            </Route>
         <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/details'>
            <Details />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/resregister'>
            <Resregister />
            </Route>
            <Route path='/resdetails'>
              <Resdetails />
            </Route>
          <Route path='/reslogin'>
            <Reslogin />
            </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;