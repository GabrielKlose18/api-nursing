const { Schema, model } = require('mongoose')

const UsuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    token_fcm: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Usuario', UsuarioSchema)
