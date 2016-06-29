angular
  .module('app')
  .controller('ModificarCtrl', function($scope, data, i18nService, uiGridConstants) {
    $scope.titulo = "Modificar Datos";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {
      // Configuracion para exportar datos.
      exporterCsvFilename: 'misdatos.csv',
      // exporterCsvColumnSeparator: ',',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
      exporterPdfFooter: function ( currentPage, pageCount ) {
        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        return docDefinition;
      },
      exporterPdfOrientation: 'portrait',
      exporterPdfPageSize: 'LETTER',
      exporterPdfMaxGridWidth: 500,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };
    $scope.gridOptions.enableGridMenu = true;
    $scope.gridOptions.selectAll = true;

    $scope.gridOptions.enableCellEdit = true;
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;

    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    $scope.gridOptions.onRegisterApi = function(gridApi){
     // console.log(gridApi);
      $scope.gridApi = gridApi;

      $scope.gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
        console.log("rowEntity: ",rowEntity);
        console.log("colDef: ", colDef);
        console.log("newValue: ",newValue);
        console.log("oldValue: ",oldValue);
        $scope.nuevo = newValue;
        $scope.viejo = oldValue;
        $scope.fila = rowEntity;
        // Aca modificamos en la BD.
      })
    }
    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });

    function columnDefs () {
      return [
        { field: 'id', name: '#', width: 45
        ,enableCellEdit: false
        },
        { field: 'titulo', name: 'ocupacion'
          ,filter:{
            condition: uiGridConstants.filter.STARTS_WITH,
            placeholder: 'comienza con...'
          }
        },
        { field: 'nombre', name: 'nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'email', name: 'mail'},
        { field: 'genero', name: 'sexo'
        // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.SELECT

          }
          //filtro de los datos
          ,editableCellTemplate: 'ui-grid/dropdownEditor'
          ,editDropdownValueLabel: 'label'
          ,editDropdownIdLabel: 'value'
          ,cellFilter: 'sexo'
        },
        { field: 'fecha_nacimiento', name: 'fechaNacimiento'
        }
      ];
    }
    data.sexo().then(function(rta){
      $scope.gridOptions.columnDefs[5].editDropdownOptionsArray = rta;
      $scope.gridOptions.columnDefs[5].filter.selectOptions = rta;
    })
  })
