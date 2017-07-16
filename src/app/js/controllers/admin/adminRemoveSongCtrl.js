app.controller('adminRemoveSongCtrl', ['$scope', 'APIService', 'APIService', function($scope, APIService, APIService){

//////////////////////// GET ALL SONGS ////////////////////////

  $scope.getAllSongs = () => {
      APIService.getAllSongs().then(function(response) {
          $scope.songs = response.data;
      }).catch(function(errMsg) {
          console.log('show profils members failed!');
      });
  };

//////////////////////// REMOVE SONG ////////////////////////

  $scope.removeSong = (id) => {
      APIService.removeSong(id).then(function(response) {}).catch(function(errMsg) {
          console.log('show profils members failed!');
      });
      $scope.getAllSongs();
  };

  $scope.getAllSongs();

//////////////////////// REMOVE INSTRUMENTAL ////////////////////////

  $scope.removeInstrumental = (songId, instrumentalId) => {
    APIService.removeInstrumentalSong(songId, instrumentalId).then((res) => {
      $scope.getAllSongs();
    });
  };

}]);
