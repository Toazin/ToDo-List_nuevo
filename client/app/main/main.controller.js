'use strict';

angular.module('toDoApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.nuevobjeto = [
      {nombre:'default', cant: 0},
    ];

    $scope.incrementCant = function(categoria){
      console.log($scope.nuevobjeto);
      for (var i = 0; i < $scope.nuevobjeto.length; i++) {
        if($scope.nuevobjeto[i].nombre == categoria){
          $scope.nuevobjeto[i].cant++;
          console.log("Cantidad de la categoria: " + $scope.nuevobjeto[i].nombre + " " + $scope.nuevobjeto[i].cant);
        }
      }
    }

    $scope.decrementCant = function(id){
      console.log($scope.nuevobjeto);
      var categoria;
      for (var i = 0; i < $scope.awesomeThings.length; i++) {
        if($scope.awesomeThings[i]._id == id){
          categoria = $scope.awesomeThings[i].categoria;
          console.log("Categoria a borrar: " + categoria);
        }
      }

      for (var i = 0; i < $scope.nuevobjeto.length; i++) {
        if($scope.nuevobjeto[i].nombre == categoria){
          $scope.nuevobjeto[i].cant--;
          console.log("Cantidad de la categoria: " + $scope.nuevobjeto[i].nombre + " " + $scope.nuevobjeto[i].cant);
        }
      }
    }

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things',  $scope.newThing );
      $scope.incrementCant($scope.newThing.categoria);
      $scope.newThing = '';
    };

    $scope.editThing = function(thing) {
      $http.put('/api/things/' + thing._id);
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
      $scope.decrementCant(thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });


    $scope.addCate = function(){
      var categoria = document.getElementById("valorCate").value
      $scope.nuevobjeto.push({nombre:categoria, cant:0});
      console.log(categoria);
      console.log($scope.nuevobjeto);
      //$scope.addCatDB();
    };

    $scope.checkCompleted = function(thing){
      thing.done =! thing.done;
      $http.put('/api/things/' + thing._id, thing);
    }

    $scope.TareasFaltantes = function(){
      $http.get('/api/things').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
        socket.syncUpdates('thing', $scope.awesomeThings);
      });
    }
    $scope.cuenta = function(){
      console.log("entre");
      var contador = 0;
      for (var i = 0; i < $scope.awesomeThings.length; i++) {
        //console.log($scope.awesomeThings[i]);
        if($scope.awesomeThings[i].categoria == 'default'){
          contador++;
          console.log($scope.awesomeThings[i].categoria);
        }
      }
      console.log(contador)
      return contador;
    }
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
