const { Schema, model } = require('mongoose')

const RemedioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Remedio', RemedioSchema)
