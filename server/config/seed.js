/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';

var Thing = require('../api/thing/thing.model');
var Cat = require('../api/AwesomeCategory/AwesomeCategory.model')
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Terminar proyecto',
    desc : 'Modificar CSS y terminar categorias',
    done: false,
    categoria: 'Escuela'
  }, {
    name : 'Correo profesores',
    desc : 'Mandar a juan, paco y pedro (de la mar)',
    done: false,
    categoria: 'Trabajo'
  }, {
    name : 'Investigar como hacer Queriees',
    desc : 'Desde el esquema?',
    done: false,
    categoria: 'Trabajo'
  });
});

Cat.find({}).remove(function() {
  Cat.create({
    nombre : 'Escuela',
    cant : 0
  }, {
    nombre : 'Trabajo',
    cant : 0
  }, {
    nombre : 'Casa',
    cant : 0
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
