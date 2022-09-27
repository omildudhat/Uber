module.exports = app => {
    const resturant = require('../controller/resturant.controller.js')
    const { checkToken } = require('../middleware/auth.js')
    const checkout = require('../controller/checkout.controller')
    //CREATE a new resturant 
    app.post("/resturant/register", resturant.create);

    //login 
    app.post("/resturant/login", resturant.find);

    app.post('/resturant/findall',resturant.findAll);

    app.post('/resturant/findResturant',resturant.findResturant);


    //update details
    app.post("/resturant/updateDetails", resturant.updateDetails);

    app.post("/resturant/orderdetails", checkout.show );

    app.post("/resturant/customerAddress", checkout.delivery);

    app.post("/resturant/orderdish", checkout.showdish);

    app.post("/resturant/status", checkout.status);

    app.post("/resturant/checkstatus", checkout.showstatus)

    app.post("/resturant/pastorders",checkout.pastorders)

    app.post("/resturant/address", resturant.addR);

    app.post("/resturant/pasto", checkout.pasto)
    //get by location 
    app.post('/resturant/location',resturant.findLocation)

    //find key 
    app.post('/resturant/key',resturant.findrKey);
};