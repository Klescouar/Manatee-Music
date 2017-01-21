app.controller('playerCtrl', ['$scope', '$http', '$stateParams', 'playerService', 'APIService', '$rootScope', function($scope, $http, $stateParams, playerService, APIService, $rootScope){


  $scope.index = 0;
  $scope.selected = -1;

  $rootScope.$watch('biding' ,function(){
  if ($rootScope.biding === true) {
    $scope.selected = -1;
  }
},true);



$scope.getAllSongs = () => {
    APIService.getAllSongs().then(function(response) {
        $scope.songs = response.data;
        playerService.AP.init({playList: $scope.songs});
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}

$scope.getAllSongs();

$scope.getAllAmbiance = () => {
    APIService.getAllAmbiance().then(function(response) {
        console.log(response.data);
        $scope.ambiances = response.data;
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}

$scope.getAllAmbiance();

$scope.getAllStyle = () => {
    APIService.getAllStyle().then(function(response) {
        $scope.styles = response.data;
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}

$scope.getAllStyle();

$scope.getAllLength = () => {
    APIService.getAllLength().then(function(response) {
        $scope.lengths = response.data;
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}

$scope.getAllLength();

$scope.getAllInstrument = () => {
    APIService.getAllInstrument().then(function(response) {
        $scope.instruments = response.data;
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}

$scope.getAllInstrument();











$scope.play = (index) => {
  if (!index && index !== 0) {
    index = $scope.index;
  }
  if ($scope.index !== index) {
    playerService.AP.play(index);
    $scope.index = index;
    $scope.selected = index;
  } else{
    playerService.AP.playToggle();
    $scope.selected === -1 ? $scope.selected = index : $scope.selected = -1;
  }
}

$scope.previousTrack = () => {
    if ($scope.index > 0) {
      playerService.AP.prev();
      $scope.selected = $scope.index - 1;
      $scope.index = $scope.index - 1;
    }
}

$scope.nextTrack = () => {
  if ($scope.index < $scope.songs.length - 1) {
    playerService.AP.next();
    $scope.selected = $scope.index + 1;
    $scope.index = $scope.index + 1;
  }
}

}]);
