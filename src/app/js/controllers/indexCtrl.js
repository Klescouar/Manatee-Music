app.controller('indexCtrl', ['$scope', 'angularPlayer', '$rootScope', '$window', function($scope, angularPlayer, $rootScope, $window) {

  $scope.menuToggle = () => {
    $('.nav-box').toggleClass('menu-open');
  }

}]);
