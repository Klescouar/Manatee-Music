app.controller('homeCtrl', ['$scope', 'angularPlayer', '$rootScope', '$window', function($scope, angularPlayer, $rootScope, $window){
  angularPlayer.stop();
   $scope.background = '../../../assets/images/home.jpg'


   const addBackgroundToNav = () => {
     $('.nav-bar').css("background-color", 'rgba(0, 0, 0, 0.8)');
   }
   const removebackgroundToNav = () => {
     $('.nav-bar').css("background-color", 'transparent');
   }

   if (window.pageYOffset > (window.innerHeight - 40)) {
       addBackgroundToNav();
   } else {
       removebackgroundToNav();
   }

   angular.element($window).bind("scroll", function() {
     console.log(window.innerHeight);
       if ($(window).scrollTop() > (window.innerHeight - 40)) {
           addBackgroundToNav();
       } else {
           removebackgroundToNav();
       }
   });

   $scope.$on('$destroy', function() {
     angular.element($window).unbind('scroll');
   });
}]);
