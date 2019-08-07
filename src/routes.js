const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const routes = express.Router();

routes.get('/', (req, res) => {
    // ?name=carlos
    //req.query.name;
 
    //return res.send(`Hello ${req.query.name}`);
    return res.json({mensage: `Hello ${req.query.name}`});

});

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store); 
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;