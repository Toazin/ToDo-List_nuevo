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

var ContraerExpander = function(){
  console.log(document.getElementById('BotonColapsar').textContent);
  if(document.getElementById('AgregaTarea').className == 'collapse'){
    //document.getElementById('AgregaTarea').className = 'collapse.in';
    document.getElementById('BotonColapsar').textContent = "Contraer";
  }else{
    //document.getElementById('AgregaTarea').className = 'collapse';
    document.getElementById('BotonColapsar').textContent = "Nueva Tarea";
  }
}
/*
var Hide = function(clase_check){
  console.log(clase_check);
  var Clase = document.getElementById(str).className;
  var ult = Clase.substr(Clase.length - 7);
  console.log(Clase);
  console.log(ult);
  if(ult == 'o fa-3x'){
    document.getElementById(clase_check).className = 'fa fa-check-circle fa-3x';
  }else{
    document.getElementById(clase_check).className = 'fa fa-check-circle-o fa-3x';
  }
}
*/
/*  if(document.getElementById('Check_true').style.display == "none"){
    document.getElementById('Check_true').style.display = "inline";
  }else if(document.getElementById('Check_true').style.display == "inline"){
    document.getElementById('Check_true').style.display = "none";
  }

  if(document.getElementById('Check_false').style.display == "none"){
    document.getElementById('Check_true').style.display = "inline";
  }else ifif(document.getElementById('Check_false').style.display == "inline"){
    document.getElementById('Check_true').style.display = "none";
  }
  */
