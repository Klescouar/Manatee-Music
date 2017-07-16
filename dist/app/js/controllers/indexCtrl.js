app.controller('indexCtrl', ['$scope', 'angularPlayer', '$rootScope', '$window', function($scope, angularPlayer, $rootScope, $window) {

//////////////////////// BUERGER MENU TOGGLE ////////////////////////
  $scope.menuToggle = () => {
    $('.nav-box').toggleClass('menu-open');
  }

}]);
