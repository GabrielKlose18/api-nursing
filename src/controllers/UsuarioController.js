const axios = require('axios')
const Usuario = require('../models/Usuario');

module.exports = {
  async index(req, res) {

    const usuarios = await Usuario.find({});

    return res.status(200).json(usuarios)
  },

  async store(req, res) {
    const { nome, email, cpf, senha } = req.body;
    try {
      const usuarioExists = await Usuario.findOne({ email, cpf });

    if (usuarioExists) {
      return res.status(401).json({error: "usuário já cadastrado"});
    }

    const usuario = await Usuario.create({
      nome,
      email,
      cpf,
      senha,
    })

      return res.status(200).json(usuario);
    } catch (error) {
      console.log('error > ', error);
      return res.status(500).json({error: "Erro interno"});
    }

  },

  async login(req, res) {
    const { email, senha, } = req.body

    try {
      const usuarioExists = await Usuario.findOne({ email, senha })

      if (!usuarioExists) {
        return res.status(400).json({error: "Senha incorreta!"})
      }

      return res.status(200).json(usuarioExists);
    } catch (error) {
      console.log('error > ', error);
      return res.status(500).json({error: "Erro interno"});
    }
  },
}
