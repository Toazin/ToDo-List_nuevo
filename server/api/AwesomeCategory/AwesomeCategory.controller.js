'use strict';

var _ = require('lodash');
var AwesomeCategory = require('./AwesomeCategory.model');

// Get list of AwesomeCategorys
exports.index = function(req, res) {
  AwesomeCategory.find(function (err, AwesomeCategorys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(AwesomeCategorys);
  });
};

// Get a single AwesomeCategory
exports.show = function(req, res) {
  AwesomeCategory.findById(req.params.id, function (err, AwesomeCategory) {
    if(err) { return handleError(res, err); }
    if(!AwesomeCategory) { return res.status(404).send('Not Found'); }
    return res.json(AwesomeCategory);
  });
};

// Creates a new AwesomeCategory in the DB.
exports.create = function(req, res) {
  AwesomeCategory.create(req.body, function(err, AwesomeCategory) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(AwesomeCategory);
  });
};

// Updates an existing AwesomeCategory in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AwesomeCategory.findById(req.params.id, function (err, AwesomeCategory) {
    if (err) { return handleError(res, err); }
    if(!AwesomeCategory) { return res.status(404).send('Not Found'); }
    var updated = _.merge(AwesomeCategory, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(AwesomeCategory);
    });
  });
};

// Deletes a AwesomeCategory from the DB.
exports.destroy = function(req, res) {
  AwesomeCategory.findById(req.params.id, function (err, AwesomeCategory) {
    if(err) { return handleError(res, err); }
    if(!AwesomeCategory) { return res.status(404).send('Not Found'); }
    AwesomeCategory.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}