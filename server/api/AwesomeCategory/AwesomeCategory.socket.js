/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var AwesomeCategory = require('./AwesomeCategory.model');

exports.register = function(socket) {
  AwesomeCategory.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  AwesomeCategory.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('AwesomeCategory:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('AwesomeCategory:remove', doc);
}