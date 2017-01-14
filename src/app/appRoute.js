app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    views:{
     'home':{
      templateUrl: 'app/views/home.html',
      controller: 'homeCtrl'
     }
    }
  })
  .state('player', {
    url: '/player',
    views:{
     'home':{
      templateUrl: 'app/views/player.html',
      controller: 'playerCtrl'
     }
    }
  })
  .state('contact', {
    url: '/contact',
    views:{
     'home':{
      templateUrl: 'app/views/contact.html',
      controller: 'contactCtrl'
     }
    }
  })
  .state('admin', {
    url: '/secret/admin',
    views:{
     'home':{
      templateUrl: 'app/views/admin.html',
      controller: 'adminCtrl'
     }
    }
  })
  $urlRouterProvider.otherwise('/home');
});
