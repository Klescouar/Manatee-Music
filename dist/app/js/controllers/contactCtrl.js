app.controller('contactCtrl', ['$scope', '$http', '$stateParams', 'playerService', function($scope, $http, $stateParams, playerService){
  playerService.AP.destroy();
}]);
