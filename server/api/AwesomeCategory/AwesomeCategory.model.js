'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AwesomeCategorySchema = new Schema({
  nombre: String,
  cant: {
    type: Number,
    default:0
  }
});

module.exports = mongoose.model('AwesomeCategory', AwesomeCategorySchema);
