const Remedio = require('../models/Remedio');

module.exports = {
  async index(req, res) {
    try {
      const { usuario_id } = req.query;
      if(!usuario_id)
        return res.status(401).json({error: "Usuário não informado"});
      Remedio.find({
        $and: [
          {
            usuario:{
              $eq: usuario_id
            }
          },
        ],
      })
      .populate("usuario")
      .then(function(dbRemedio) {
        return res.status(200).json(dbRemedio);
      })
      .catch(function(err) {
        return res.status(500).json({error: "Erro interno"});
      });
      // return res.status(200).json(remedios); 
    } catch (error) {
      return res.status(500).json({error: "Erro interno"});
    }
  },

  async store(req, res) {
    const { nome, quantidade,usuario_id } = req.body;
    try {
    const remedio = await Remedio.create({
      nome,
      quantidade,
      usuario: usuario_id
    });

      return res.status(200).json(remedio);
    } catch (error) {
      return res.status(500).json({error: "Erro interno"});
    }

  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Remedio.deleteOne({_id:id});
      return res.status(200).json({success: true});
    } catch (error) {
      return res.status(500).json({error: "Erro interno"});
    }

  }
}
