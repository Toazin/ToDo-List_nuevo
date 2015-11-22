'use strict';

angular.module('toDoApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
var CheckRep =  function(str){
    document.getElementById('Diario').className = "btn btn-primary";
    document.getElementById('Semanal').className = "btn btn-primary";
    document.getElementById('Mensual').className = "btn btn-primary";
    document.getElementById(str).className = "btn btn-primary active";
}
var isActive = function(str){
  console.log(str);
  if(!document.getElementById(str).className){
    document.getElementById(str).className = "active";
  }else{
    document.getElementById(str).className = "";
  }

}
