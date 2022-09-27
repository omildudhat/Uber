module.exports = app => {
    const favorite = require('../controller/favorite.controller')
    const { checkToken } = require('../middleware/auth.js')

    app.post('/favorite/show', favorite.show);
    
    app.post('/favorite/add', favorite.addf);

    app.post('/favorite/remove', favorite.removef);

    app.post('/favorite/check', favorite.check)
}