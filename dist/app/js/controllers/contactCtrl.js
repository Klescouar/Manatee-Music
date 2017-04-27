app.controller('contactCtrl', ['$scope', '$http', 'angularPlayer', '$rootScope', function($scope, $http, angularPlayer, $rootScope){
  angularPlayer.stop();
  $('.nav-bar').css("background-color", 'transparent');

  const addBackgroundToNav = () => {
    $('.nav-bar').css("background-color", 'rgba(0, 0, 0, 0.8)');
  }
  const removebackgroundToNav = () => {
    $('.nav-bar').css("background-color", 'transparent');
  }

  if (window.pageYOffset > (window.innerHeight/1.5)) {
      addBackgroundToNav();
  } else {
      removebackgroundToNav();
  }

  window.addEventListener('scroll', function() {
      if ($(window).scrollTop() > (window.innerHeight/1.5)) {
          addBackgroundToNav();
      } else {
          removebackgroundToNav();
      }
  });
}]);
