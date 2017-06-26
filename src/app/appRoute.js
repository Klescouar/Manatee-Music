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
  .state('adminConnect', {
    url: '/secret/admin/connect',
    views:{
     'home':{
      templateUrl: 'app/views/admin/admin-connect.html',
      controller: 'adminConnectCtrl'
     }
    }
  })
  .state('admin', {
    url: '/secret/admin',
    views:{
     'home':{
      templateUrl: 'app/admin.html',
      controller: 'adminCtrl',
      resolve:{
       function(AuthService, $state){
        const role = AuthService.userRole();
        if (role === 'Admin') {
          return true;
        }else{
          $state.go('adminConnect');
          return false;
        }
       }
      }
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
