app.controller('adminConnectCtrl', ['$scope', "AuthService", "$state", function($scope, AuthService, $state){
  $scope.user = {
    role : "Admin"
  };

//////////////////////// ADMIN LOGIN FUNCTION ////////////////////////
  $scope.login = (user) => {
    AuthService.login(user).then((res) => {
      $state.go("admin");
    })
  }

}]);
