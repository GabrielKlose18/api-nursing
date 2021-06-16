const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index(req, res) {
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } }, // não listar o usuário atual
        { _id: { $nin: loggedDev.likes } }, // não listar usuários que já deu like
        { _id: { $nin: loggedDev.dislikes } }, // não listar usuários que já deu dislike
      ],
    })

    return res.json(users)
  },

  async store(req, res) {
    const { nome: name, email, password, foto: avatar } = req.body
    try {
      const userExists = await Dev.findOne({ email })

    if (userExists) {
      return res.json(userExists)
    }

    const dev = await Dev.create({
      name,
      email,
      password,
      avatar,
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
      const userExists = await Dev.findOne({ email, password })

      if (!userExists) {
        return res.status(400).json({error: "Senha incorreta!"})
      }

      return res.status(200).json(userExists);
    } catch (error) {
      console.log('error > ', error);
      return res.status(500).json({error: "Erro interno"});
    }
  },
}
