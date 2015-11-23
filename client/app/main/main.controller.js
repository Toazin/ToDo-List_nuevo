'use strict';

angular.module('toDoApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.BaseTareas = [];
    $scope.BaseCategorias = [];

  //  $scope.BaseCategorias = [
  //    {nombre:'default', cant: 0},
  //  ];

    $http.get('/api/AwesomeCategorys').success(function(BaseCategorias) {
      $scope.BaseCategorias = BaseCategorias;
      socket.syncUpdates('AwesomeCategory', $scope.BaseCategorias);
    });

    $http.get('/api/things').success(function(BaseTareas) {
      $scope.BaseTareas = BaseTareas;
      socket.syncUpdates('thing', $scope.BaseTareas);
    });

//METODO INCREMENTAR CATEGORIA
    $scope.incrementCant = function(categoria){
      console.log($scope.BaseCategorias);
      for (var i = 0; i < $scope.BaseCategorias.length; i++) {
        if($scope.BaseCategorias[i].nombre == categoria){
          $scope.BaseCategorias[i].cant++;
          console.log("Cantidad de la categoria: " + $scope.BaseCategorias[i].nombre + " " + $scope.BaseCategorias[i].cant);
        }
        $scope.UpdateCantidad($scope.BaseCategorias[i]);
      }
    }
// METODO DECREMENTA CATEGORIA
    $scope.decrementCant = function(id){
      console.log($scope.BaseCategorias);
      var categoria;
      for (var i = 0; i < $scope.BaseTareas.length; i++) {
        if($scope.BaseTareas[i]._id == id){
          categoria = $scope.BaseTareas[i].categoria;
          console.log("Categoria a borrar: " + categoria);
        }
      }

      for (var i = 0; i < $scope.BaseCategorias.length; i++) {
        if($scope.BaseCategorias[i].nombre == categoria){
          $scope.BaseCategorias[i].cant--;
          console.log("Cantidad de la categoria: " + $scope.BaseCategorias[i].nombre + " " + $scope.BaseCategorias[i].cant);
        }
        $scope.UpdateCantidad($scope.BaseCategorias[i]);
      }
    }

    //METODO AGREGAR BASE DE TAREAS
        $scope.addThing = function() {
          if($scope.newThing === '') {
            return;
          }
          $http.post('/api/things',  $scope.newThing );
          $scope.incrementCant($scope.newThing.categoria);
          $scope.newThing = '';
        };

    //METODO AGREGAR BASE DE Cat
        $scope.addThingCat = function() {
          if($scope.newThing === '') {
            return;
          }
          //console.log($scope.newThing);
          //console.log($scope.newThing.nombre);
          $http.post('/api/AwesomeCategorys',  $scope.newThing );
          $scope.newThing = '';
          $scope.ActualizaCantCate();
        };
        //Actualiza cantidad en categorias de la base de tareas
            $scope.ActualizaCantCate = function(){
              var cantidadCategoria = 0;
              var categoriaString = '';
              //console.log("Entre");
              for (var i = 0; i < $scope.BaseCategorias.length; i++) {
                //$scope.BaseCategorias[i];
                cantidadCategoria = 0;
                categoriaString = $scope.BaseCategorias[i].nombre;
                //console.log("Pasada numero: " + i + " Para la categoria : " + categoriaString);
                for (var j = 0; j < $scope.BaseTareas.length; j++) {
                  //$scope.BaseTareas[j];
                  //console.log("Pasada numero: " + j + " Para tareas: " + $scope.BaseTareas[j].name + " , nombre cat de la tarea: " + $scope.BaseTareas[i].categoria);
                  if(categoriaString == $scope.BaseTareas[j].categoria){
                    cantidadCategoria++;
                  }
                }
                $scope.BaseCategorias[i].cant = cantidadCategoria;
                //console.log("Cantidad registrada: " + cantidadCategoria);
                //console.log("Objeto que se le pasa a Update" + $scope.BaseCategorias[i]);
                //console.log($scope.BaseCategorias[i]);
                $scope.UpdateCantidad($scope.BaseCategorias[i]);
              }
            }

            $scope.UpdateCantidad = function(thing){
              //console.log("objeto en update: " + thing);
              //console.log($scope.BaseCategorias[i]);
              //console.log("ID: " + thing._id);
              $http.put('/api/AwesomeCategorys/' + thing._id, thing);
            }
/*
    $scope.addCate = function(){
          var categoria = document.getElementById("valorCate").value
          $scope.BaseCategorias.push({nombre:categoria, cant:0});
          console.log(categoria);
          console.log($scope.BaseCategorias);
          //$scope.addCatDB();
    };
*/
    $scope.editThing = function(thing) {
      $http.put('/api/things/' + thing._id, thing);
      $scope.ActualizaCantCate();
    };

//ELIMINA DE BASE TAREAS
    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
      $scope.decrementCant(thing._id);
    };

//ELIMINA DE BASE TAREAS
    $scope.deleteThingCate = function(thing) {
      $http.delete('/api/AwesomeCategorys/' + thing._id);
    };

    $scope.checkCompleted = function(thing){
      thing.done =! thing.done;
      $http.put('/api/things/' + thing._id, thing);
    }
    $scope.MuestraTerminados = function(){
      $http.get('/api/things/{"done":"false"}').success(function(BaseTareas) {
        $scope.BaseTareas = BaseTareas;
        socket.syncUpdates('thing', $scope.BaseTareas);
      });
    }
    $scope.MuestraPendientes = function(){
      $http.get('/api/things/{"done":"true"}').success(function(BaseTareas) {
        $scope.BaseTareas = BaseTareas;
        socket.syncUpdates('thing', $scope.BaseTareas);
      });
    }
    $scope.MuestraTodos = function(){
      $http.get('/api/things').success(function(BaseTareas) {
        $scope.BaseTareas = BaseTareas;
        socket.syncUpdates('thing', $scope.BaseTareas);
      });
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('AwesomeCategory');
    });
  });
