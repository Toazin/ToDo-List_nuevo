'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  desc: String,
  active: Boolean,
  fecha:{
    dia:Number,
    mes:String,
    año:Number
  },
  categoria:{
    id:Number,
    nombre:String,
    cantidad:Number
  },
  Repeticion:Number //1--> diario 2--> semalan 3--> mensual
});



module.exports = mongoose.model('Thing', ThingSchema);
