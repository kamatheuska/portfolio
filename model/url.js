const mongoose = require('mongoose');
const { addHttp } = require('../utils/url');

const urlSchema = new mongoose.Schema({
  original: String,
  short: String
})

urlSchema.pre('save', function () {
  this.original = addHttp(this.original);
  return; 
})


const Url = mongoose.model('Url', urlSchema)
module.exports = Url;