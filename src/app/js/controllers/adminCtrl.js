app.controller('adminCtrl', ['$scope', '$stateParams', 'APIService', 'angularPlayer', function($scope, $stateParams, APIService, angularPlayer){

  angularPlayer.stop();
  $scope.show = "";

}]);
