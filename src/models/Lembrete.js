const { Schema, model } = require('mongoose');

const LembreteSchema = new Schema(
  {
    data: {
      type: Date,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    ingerido: {
      type: Boolean,
      default: false,
    },
    remedio: { 
      type: Schema.Types.ObjectId,
      ref: 'Remedio',
      required: true,
    },
    usuario:{ 
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('Lembrete', LembreteSchema)
