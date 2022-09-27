module.exports = app => {
    const customer = require('../controller/customer.controller.js')
    const { checkToken } = require('../middleware/auth.js')
    const cart = require('../controller/cart.controller')
    const orders = require('../controller/orders.controller')
 
    //CREATE a new Customer 
    app.post("/register", customer.create);

    //login 
    app.post("/login", customer.find);

    //get users
    app.get("/inside", checkToken, customer.findAll);

    //update details
    app.post("/updateDetails", customer.updateDetails);

    app.post("/customer/order", orders.add);

    //get key 
    app.post("/key", customer.findKey)

    app.post("/customer/address", customer.add)

    app.post("/customer/getAddress", customer.show);
    //add caddresses
    

    app.post("/customer/addtocart", cart.add);

    app.post("/customer/removefromcart", cart.remove);
};