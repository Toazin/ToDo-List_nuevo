'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  desc: String,
  done: {
    type: Boolean,
    default: false
  },
  fecha:{
    dia:Number,
    mes:String,
    año:Number
  },
  categoria: {
      type: String,
      default: 'default'
    },
  Repeticion:Number //1--> diario 2--> semalan 3--> mensual
});




module.exports = mongoose.model('Thing', ThingSchema);
