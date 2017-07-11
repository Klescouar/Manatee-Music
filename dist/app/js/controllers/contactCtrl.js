app.controller('contactCtrl', ['$scope', '$http', 'angularPlayer', '$rootScope', '$window', 'APIService', function($scope, $http, angularPlayer, $rootScope, $window, APIService) {
  angularPlayer.stop();
  $scope.$on('$destroy', function() {
    angular.element($window).unbind('scroll');
  });

  $scope.user = {
    lastName: '',
    firstName: '',
    email: '',
    message: ''
  }

  $scope.sendMail = () => {
    $('.button').addClass("loading");
    APIService.sendMail($scope.user).then((response) => {
      console.log(response.data);
      setTimeout(function() {
        $('.button').addClass("ready");
      }, 1000);
    }).catch((errMsg) => {
      console.log('show profils members failed!');
    });
  }


  $('.nav-bar').css("background-color", 'transparent');
  const addBackgroundToNav = () => {
    $('.nav-bar').css("background-color", 'rgba(0, 0, 0, 0.8)');
  }
  const removebackgroundToNav = () => {
    $('.nav-bar').css("background-color", 'transparent');
  }
  if (window.pageYOffset > (window.innerHeight / 1.7)) {
    addBackgroundToNav();
  } else {
    removebackgroundToNav();
  }
  angular.element($window).bind("scroll", function() {
    if ($(window).scrollTop() > (window.innerHeight / 1.7)) {
      addBackgroundToNav();
    } else {
      removebackgroundToNav();
    }
  });

}]);
