const express = require('express');
const routes = express.Router();

const UsuarioController = require('./controllers/UsuarioController');

routes.get('/', (req, res) => {
  return res.status(200).json({ status: true });
})

routes.get('/devs', UsuarioController.index);
routes.post('/devs', UsuarioController.store);
routes.post('/login', UsuarioController.login);

module.exports = routes;
