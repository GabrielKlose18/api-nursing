const Remedio = require('../models/Remedio');

module.exports = {
  async index(req, res) {
    try {
      const remedios = await Remedio.find();
      return res.status(200).json(remedios); 
    } catch (error) {
      return res.status(500).json({error: "Erro interno"});
    }
  },

  async store(req, res) {
    const { nome, quantidade } = req.body;
    try {
    const remedio = await Remedio.create({
      nome,
      quantidade,
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
