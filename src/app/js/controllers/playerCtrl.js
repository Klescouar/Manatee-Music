app.controller('playerCtrl', ['$scope', '$http', '$stateParams', 'playerService', 'APIService', function($scope, $http, $stateParams, playerService, APIService){


  $scope.getAllSongs = () => {
    APIService.getAllSongs().then(function(response) {
      console.log(response.data);
      $scope.songs = response.data;
      AP.init({
        playList: $scope.songs
      });
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
  }

  $scope.getAllSongs();

}]);
