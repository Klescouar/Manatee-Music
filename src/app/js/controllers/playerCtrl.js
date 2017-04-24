app.controller('playerCtrl', ['$scope', '$http', '$stateParams', 'playerService', 'APIService', '$rootScope', 'angularPlayer', '$state', function($scope, $http, $stateParams, playerService, APIService, $rootScope, angularPlayer, $state){
  $scope.volume = 90;
  $scope.isDisabled = true;
  $scope.progress = 0;
  $scope.filters = [];
  $scope.currentSong = {};
  $scope.openInst = '';
  $scope.thisSong = {};
  let songsId = [];
  const playSvg = document.querySelector('.icon-play');
  const playSvgPath = playSvg.querySelector('path');
  let volumeStatus = 0;

  const transformKeys = obj => {
      result = {};
      Object.keys(obj).forEach(x => {
          const y = x.replace("_", "");
          result[y] = obj[x];
      });
      return result;
  }

  const getArrayOfsongsId = (item) => {
    songsId.push(item.id);
  }

  const addInstrumentalToPlaylist = (item) => {
    const playlist = angularPlayer.getPlaylist();
    playlist.map(getArrayOfsongsId);
    angularPlayer.addTrack(item, songsId.indexOf(item.integral));
  }

  const addTrackToPlaylist = (item) => {
      angularPlayer.addTrack(item);
  }

  const removeTrackToPlaylist = (item) => {
    const playlist = angularPlayer.getPlaylist();
    angularPlayer.removeSong(item.id, playlist.indexOf(item));
  };

  const getOnSong = (item, id) => {
    if (item.id === id) {
      return $scope.thisSong = item;
    }
  };

  $scope.openInstrumental = (id) => {
    $scope.songs.map(function(item) { return getOnSong(item, id); });
    if ($scope.openInst === id) {
      $scope.openInst = '';
      $scope.thisSong.instrumental.map(removeTrackToPlaylist);
      // $scope.getAllSongs();
    } else {
      $scope.openInst = id;
      $scope.thisSong.instrumental.map(addInstrumentalToPlaylist);
    }
    const playlist = angularPlayer.getPlaylist();
    playlist.map(removeTrackToPlaylist);
    console.log($scope.songs);
    $scope.songs.map(addTrackToPlaylist);
    console.log(angularPlayer.getPlaylist());
  };


  ////////////////////////////////////////// GET ALL SONGS //////////////////////////////////////////

  $scope.getAllSongs = () => {
      APIService.getAllSongs().then(function(response) {
          $scope.allSongs = response.data.map(transformKeys);
          $scope.allSongs.map(addTrackToPlaylist);
          $scope.songs = $scope.allSongs;
      }).catch(function(errMsg) {
          console.log('show profils members failed!');
      });
  }
  $scope.getAllSongs();

  ////////////////////////////////////////// GET ALL FILTERS //////////////////////////////////////////

  $scope.getAllAmbiance = () => {
      APIService.getAllAmbiance().then(function(response) {
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

  ////////////////////////////////////////// HANDLE PLAYER //////////////////////////////////////////

  $scope.$on('track:id', function(event, data) {
    $scope.currentSong.title = angularPlayer.currentTrackData().title;
    $scope.currentSong.icon = angularPlayer.currentTrackData().icon;
      $scope.currentTrackId = data;
  });

  $scope.playSong = (id) => {
      $scope.isDisabled = false;
      playSvgPath.setAttribute('d', playSvg.getAttribute('data-pause'));
      if (angularPlayer.getCurrentTrack() === null) {
          playSvgPath.setAttribute('d', playSvg.getAttribute('data-pause'));
          return angularPlayer.playTrack(id);
      } else {
          if (angularPlayer.getCurrentTrack() === id && $scope.isPlaying) {
              playSvgPath.setAttribute('d', playSvg.getAttribute('data-play'));
              return angularPlayer.pause();
          } else {
              playSvgPath.setAttribute('d', playSvg.getAttribute('data-pause'));
              return angularPlayer.playTrack(id);
          }
      }
  }

  $scope.playToggle = () => {
      $scope.isDisabled = false;
      if (angularPlayer.isPlayingStatus()) {
          //if playing then pause
          angularPlayer.pause();
          playSvgPath.setAttribute('d', playSvg.getAttribute('data-play'));
      } else {
          //else play if not playing
          angularPlayer.play();
          playSvgPath.setAttribute('d', playSvg.getAttribute('data-pause'));
      }
  }

  $scope.nextTrack = () => {
      $scope.isDisabled = false;
      if (angularPlayer.getPlaylist()[angularPlayer.getPlaylist().length - 1].id === angularPlayer.getCurrentTrack()) {
          angularPlayer.stop();
          playSvgPath.setAttribute('d', playSvg.getAttribute('data-play'));
          $scope.isDisabled = true;
      } else if (angularPlayer.isPlayingStatus()) {
          angularPlayer.nextTrack();
          playSvgPath.setAttribute('d', playSvg.getAttribute('data-pause'));
      }
  }

  $scope.prevTrack = () => {
      $scope.isDisabled = false
      if (angularPlayer.isPlayingStatus()) {
          angularPlayer.prevTrack();
          playSvgPath.setAttribute('d', playSvg.getAttribute('data-pause'));
      }
  }

  $scope.$watch('volume', function(newValue, oldValue) {
      angularPlayer.adjustVolumeSlider(newValue);
  });

  $scope.handleVol = () => {
      if ($scope.volume > 0) {
          volumeStatus = $scope.volume;
          angularPlayer.adjustVolumeSlider(0);
          $scope.volume = 0;
      } else {
          angularPlayer.adjustVolumeSlider(volumeStatus);
          $scope.volume = volumeStatus;
      }
  }


  ////////////////////////////////////////// HANDLE FILTERS //////////////////////////////////////////

  $scope.addFilter = (name) => {
    $scope.songs = [];
    $scope.filters.indexOf(name) === -1 ? $scope.filters.push(name) : $scope.filters.splice($scope.filters.indexOf(name), 1);
    $scope.allSongs.map(filterResult);
    const playlist = angularPlayer.getPlaylist();
    playlist.map(removeTrackToPlaylist);
    console.log($scope.songs);
    $scope.songs.map(addTrackToPlaylist);
    // console.log(angularPlayer.getPlaylist());
  }

  const filterResult = (item) => {
    if ($scope.filters.length === 0) {
      return $scope.songs = $scope.allSongs;
    } else if (!$scope.filters.some(val => item.tags.indexOf(val) === -1) && $scope.songs.indexOf(item) === -1) {
      return $scope.songs.push(item);
    } else if ($scope.songs.indexOf(item) !== -1 && $scope.filters.some(val => item.tags.indexOf(val) === -1)) {
      return  $scope.songs.splice($scope.songs.indexOf(item), 1);
    }
  }

$rootScope.$on( "$stateChangeStart", function(event, next, current) {
  $('.nav-bar').css("background-color", 'transparent');
});



  $('.nav-bar').css("background-color", 'rgb(34,34,34)');

}]);
