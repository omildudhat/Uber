module.exports = app => {
    const dish = require('../controller/dish.controller.js')
    const { checkToken } = require('../middleware/auth.js')
    
    //CREATE a new dish
    app.post("/dish/add", dish.create);

    //find a dish
    app.post("/dish/find", dish.find);

    app.post('/dish/update',dish.updateDetails);
    //find resturant
    app.post("/dish/findresturant", dish.findResturant);

    //delete dishes 
    app.post("/dish/delete", dish.delDish);

    app.post('/dish/getDish', dish.getDishes);

    app.post('/dish/key', dish.findpic)
};