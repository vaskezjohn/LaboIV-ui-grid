angular
  .module('app')
  .controller('ConfTPCtrl', function($scope, data, i18nService, uiGridConstants,NgMap) {
    $scope.titulo = "Configuracion Campos";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    data.data100().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
      console.info(rta);
    });

    //grid.appScope 

    console.log(uiGridConstants);

    function columnDefs () {
      return [
        { field: 'foto', cellTemplate:"<img width='50px' height='25px' ng-src='{{grid.getCellValue(row, col)}}' lazy-src>"},
        { field: 'avatar', cellTemplate:"<img width='50px' height='25px' ng-src='{{grid.getCellValue(row, col)}}' lazy-src>"},
      
        { field: 'nombre', name: 'nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'email', name: 'mail'},
        { field: 'sexo', name: 'sexo'
        // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [
              {value: '1', label: 'Masculino'},
              {value: '2', label: 'Femenino'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'sexoTP'
        },
        { field: 'fechaNacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        },
        { field: 'click', cellTemplate: '<button class="btn-primary" ng-click="grid.appScope.MostrarUbicacion(row.entity)">Ubicacion</button>' }


      ];
    }

    $scope.MostrarUbicacion=function(row){
      console.info(row);
      $scope.latitud=47;
      $scope.logitud=-23;

      $scope.latitud=row['latitud'];
      $scope.logitud=row['logitud'];

    }
    //$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOoREaTARHW9ozVz9GHHCcx4jhn2FLwpM";

     NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });


  })
 