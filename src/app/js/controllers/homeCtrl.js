app.controller('homeCtrl', ['$scope', 'angularPlayer', '$rootScope', function($scope, angularPlayer, $rootScope){
  angularPlayer.stop();
   $scope.background = '../../../assets/images/test3.jpg'


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

   window.addEventListener('scroll', function() {
       if ($(window).scrollTop() > (window.innerHeight - 40)) {
           addBackgroundToNav();
       } else {
           removebackgroundToNav();
       }
   });
}]);
