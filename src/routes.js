const express = require('express');
const routes = express.Router();

const UsuarioController = require('./controllers/UsuarioController');
const RemedioController = require('./controllers/RemedioController');

routes.get('/', (req, res) => {
  return res.status(200).json({ status: true });
})

routes.get('/usuario', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);
routes.post('/login', UsuarioController.login);

routes.get('/remedio', RemedioController.index);
routes.post('/remedio', RemedioController.store);
routes.delete('/remedio/:id', RemedioController.delete);

module.exports = routes;
