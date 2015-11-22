'use strict';

angular.module('toDoApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things',  $scope.newThing );
      $scope.newThing = '';
    };

    $scope.editThing = function(thing) {
      $http.put('/api/things/' + thing._id);
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.nuevobjeto = [
      {nombre:'Default', bandera1:'1'},
    ];
    $scope.addCate = function(){
      var categoria = document.getElementById("valorCate").value
      $scope.nuevobjeto.push({nombre:categoria, bandera1:'3'});
      console.log(categoria);
      console.log($scope.nuevobjeto);
      //$scope.addCatDB();
    };


/*
    $scope.addCatDB = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        Prueba: $scope.nuevobjeto
       });
      $scope.newThing = '';
    };

    $http.get('/api/things').success(function(nuevobjeto) {
      $scope.nuevobjeto = nuevobjeto;
      //socket.syncUpdates('thing', $scope.nuevobjeto);
    });
    $scope.imprime = function(){
      console.log(document.getElementById('categor').value);
      console.log("noserci");
    }
*/

  });
