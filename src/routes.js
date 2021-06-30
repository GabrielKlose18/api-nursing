const express = require('express');
const routes = express.Router();

const UsuarioController = require('./controllers/UsuarioController');
const RemedioController = require('./controllers/RemedioController');
const LembreteController = require('./controllers/LembreteController');
const SendPushController = require('./controllers/SendPushController');

routes.get('/', (req, res) => {
  return res.status(200).json({ status: true });
})

routes.get('/usuario', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);
routes.post('/updateFcm', UsuarioController.updateFcm);
routes.post('/login', UsuarioController.login);

routes.get('/remedio', RemedioController.index);
routes.post('/remedio', RemedioController.store);
routes.delete('/remedio/:id', RemedioController.delete);

routes.get('/lembrete', LembreteController.index);
routes.post('/lembrete', LembreteController.store);

routes.get('/push', SendPushController.sendPush);

module.exports = routes;
