app.controller('contactCtrl', ['$scope', '$http', 'angularPlayer', '$rootScope', '$window', function($scope, $http, angularPlayer, $rootScope, $window){
  angularPlayer.stop();
  $('.nav-bar').css("background-color", 'transparent');

  const addBackgroundToNav = () => {
    $('.nav-bar').css("background-color", 'rgba(0, 0, 0, 0.8)');
  }
  const removebackgroundToNav = () => {
    $('.nav-bar').css("background-color", 'transparent');
  }

  if (window.pageYOffset > (window.innerHeight/1.7)) {
      addBackgroundToNav();
  } else {
      removebackgroundToNav();
  }

  angular.element($window).bind("scroll", function() {
    console.log(window.innerHeight);
      if ($(window).scrollTop() > (window.innerHeight/1.7)) {
          addBackgroundToNav();
      } else {
          removebackgroundToNav();
      }
  });

  $scope.$on('$destroy', function() {
    angular.element($window).unbind('scroll');
  });
}]);
