const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.get('/', (req, res) => {
  return res.json({ status: true });
})

routes.get('/devs', UserController.index);
routes.post('/devs', UserController.store);
routes.post('/login', UserController.login);

module.exports = routes;
