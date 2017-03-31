app.controller('adminRemoveSongCtrl', ['$scope', 'APIService', function($scope, APIService){

  $scope.getAllSongs = () => {
      APIService.getAllSongs().then(function(response) {
          $scope.songs = response.data;
      }).catch(function(errMsg) {
          console.log('show profils members failed!');
      });
  }

  $scope.removeSong = (id) => {
      APIService.removeSong(id).then(function(response) {}).catch(function(errMsg) {
          console.log('show profils members failed!');
      });
      $scope.getAllSongs();
  }

  $scope.getAllSongs();

}]);
