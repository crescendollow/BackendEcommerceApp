const mongoose = require('mongoose');
const tiketCollection = ('tiket')

const tiketSchema = new mongoose.Schema({
    code: {
      type: String,
      required: true,
      unique:true,
    },
    purchace_datetime: {
      type: String,
      required: true,
    },
    amounr: {
      type: Number,
      required: true,
    },
    parchacer: {
      type: String,
      required: true,
    }
  });
  
  const tiketModel = mongoose.model(tiketCollection, tiketSchema);
  module.exports = tiketModel;