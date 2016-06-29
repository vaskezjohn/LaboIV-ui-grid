angular
  .module('app')
  .controller('PaginadaCtrl', function($scope, data) {
    $scope.titulo = "Grilla Paginada";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    })
  })
