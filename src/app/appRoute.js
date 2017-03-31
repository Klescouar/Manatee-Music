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
      templateUrl: 'app/admin.html',
      controller: 'adminCtrl'
     }
    }
  })
  .state('admin.addSong', {
  url: '/addSong',
  views:{
    'admin_dashboard':{
      templateUrl: 'app/views/admin/admin-addSong.html',
      controller: 'adminAddSongCtrl'
    }
  }
})
.state('admin.removeSong', {
url: '/removeSong',
views:{
  'admin_dashboard':{
    templateUrl: 'app/views/admin/admin-removeSong.html',
    controller: 'adminRemoveSongCtrl'
  }
}
})
.state('admin.handleFilter', {
url: '/handleFilter',
views:{
  'admin_dashboard':{
    templateUrl: 'app/views/admin/admin-handleFilter.html',
    controller: 'adminHandleFilterCtrl'
  }
}
})
.state('admin.waitingCard', {
  url: '/waitingCard',
  views:{
    'admin_dashboard':{
      templateUrl: 'app/views/BO-views/waiting-card.html',
      controller: 'waitingCardCtrl'
    }
  }
})
  $urlRouterProvider.otherwise('/home');
});
