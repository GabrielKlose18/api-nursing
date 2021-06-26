const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index(req, res) {
    const { usuario } = req.headers

    const loggedDev = await Dev.findById(usuario)

    const usuarios = await Dev.find({
      $and: [
        { _id: { $ne: usuario } }, // não listar o usuário atual
        { _id: { $nin: loggedDev.likes } }, // não listar usuários que já deu like
        { _id: { $nin: loggedDev.dislikes } }, // não listar usuários que já deu dislike
      ],
    })

    return res.status(200).json(usuarios)
  },

  async store(req, res) {
    const { nome, email, cpf, password } = req.body
    try {
      const usuarioExists = await Dev.findOne({ email })

    if (usuarioExists) {
      return res.status(400).json(usuarioExists)
    }

    const dev = await Dev.create({
      nome,
      email,
      password,
    })

      return res.status(200).json(dev);
    } catch (error) {
      console.log('error > ', error);
      return res.status(500).json({error: "Erro interno"});
    }

  },

  async login(req, res) {
    const { email, password, } = req.body

    try {
      const usuarioExists = await Dev.findOne({ email, password })

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
