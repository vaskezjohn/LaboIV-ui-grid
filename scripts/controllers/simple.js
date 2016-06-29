angular
  .module('app')
  .controller('SimpleCtrl', function($scope, data) {
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};

    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    })
  })
