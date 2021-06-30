const Lembrete = require('../models/Lembrete');
const { startOfDay, endOfDay, parseISO, addHours } = require('date-fns');


module.exports = {
  async index(req, res) {
    const { usuario_id } = req.query;
    if(!usuario_id)
      return res.status(401).json({error: "Usuário não informado"});
    try {
      Lembrete.find({
        $and: [
          {
            data: {
              $gte: startOfDay(new Date()),
              $lte: endOfDay(new Date())
            },
            usuario:{
              $eq: usuario_id
            }
          },
        ],
      })
      .populate("remedio")
      .populate("usuario")
      .then(function(dbLembrete) {
        res.status(200).json(dbLembrete);
      })
      .catch(function(err) {
        return res.status(500).json({error: "Erro interno"});
      });

      // return res.status(200).json(lembretes); 
    } catch (error) {
      return res.status(500).json({error: "Erro interno"});
    }
  },

  async store(req, res) {
    const { horario, periodo, quantidade, remedio, dataFim, usuario_id} = req.body;
    try {
      const hora = horario.split(':')[0];
      const minuto = horario.split(':')[1];
      const data_atual = new Date();
      let data_inicio = new Date(data_atual.getFullYear(), data_atual.getMonth(), data_atual.getDate(), hora, minuto);
      
      var dia  = dataFim.split("/")[0];
      var mes  = dataFim.split("/")[1];
      var ano  = dataFim.split("/")[2];
      const data_fim = new Date(`${ano}-${mes}-${dia} 23:59`); // passando a data para formato js
      let arrayLembretes = [];
      while(data_inicio < data_fim){
        arrayLembretes.push({
          data: data_inicio,
          quantidade: quantidade,
          remedio,
          usuario: usuario_id
        });
        data_inicio = addHours(data_inicio, periodo.split(':')[0]);
      }
      if(arrayLembretes.length === 0)
        return res.status(4001).json({error: "Não foi possível salvar o lembrete. Verifique os campos novamente"});
      console.log('arrayLembretes > ', arrayLembretes);
      await Lembrete.insertMany(arrayLembretes);

      return res.status(200).json({success: true});
    } catch (error) {
      return res.status(500).json({error: "Erro interno"});
    }

  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Lembrete.deleteOne({_id:id});
      return res.status(200).json({success: true});
    } catch (error) {
      return res.status(500).json({error: "Erro interno"});
    }

  }
}
