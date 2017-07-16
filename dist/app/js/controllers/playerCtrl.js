app.controller('playerCtrl', ['$scope', '$http', '$stateParams', 'playerService', 'APIService', '$rootScope', 'angularPlayer', '$state', '$mdSidenav', function($scope, $http, $stateParams, playerService, APIService, $rootScope, angularPlayer, $state, $mdSidenav) {
  $scope.volume = 90;
  $scope.isDisabled = true;
  $scope.progress = 0;
  $scope.filters = [];
  $scope.currentSong = {};
  $scope.openInst = '';
  $scope.thisSong = {};
  $scope.filterOrder = '';
  let songsId = [];
  const playSvg = document.querySelector('.icon-play');
  const playSvgPath = playSvg.querySelector('path');
  let volumeStatus = 0;

////////////////////////FILTERS SIDE MENU////////////////////////
  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

////////////////////////TRANSFORM _ID TO ID////////////////////////
  const transformKeys = obj => {
    result = {};
    Object.keys(obj).forEach(x => {
      const y = x.replace("_", "");
      result[y] = obj[x];
    });
    return result;
  }

////////////////////////GET ALL SONGS ID IN AN ARRAY////////////////////////
  const getArrayOfsongsId = (item) => {
    songsId.push(item.id);
  }

////////////////////////HANDLE PLAYLIST////////////////////////
  const addTrackToPlaylist = (item) => {
    angularPlayer.addTrack(item);
  }

  const removeInstrumental = (item) => {
    return !item.integral;
  };

  const removeTrackToPlaylist = (item) => {
    const playlist = angularPlayer.getPlaylist();
    angularPlayer.removeSong(item.id, playlist.indexOf(item));
  };

////////////////////////FIND BY ATTRIBUTE FUNCTION////////////////////////
  function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

////////////////////////ADD INSTRUMENTALS TO PLAYLIST////////////////////////
  const addInstrumentalToPlaylist = (item) => {
    const trackIndex = findWithAttr($scope.songs, 'id', item.integral);
    $scope.songs.splice(trackIndex + 1, 0, item);
  }

////////////////////////GET A SONG////////////////////////
  const getOnSong = (item, id) => {
    if (item.id === id) {
      return $scope.thisSong = item;
    }
  };
////////////////////////HANDLE TRI////////////////////////
  $scope.changeOrder = (order) => {
    angularPlayer.stop();
    playSvgPath.setAttribute('d', playSvg.getAttribute('data-play'));
    $scope.songs = $scope.songs.filter(removeInstrumental);
    angularPlayer.clearPlaylist(function() {
      if (order === 'title' && $scope.orderProperty !== 'title') {
        $scope.songs.sort(function(a, b) {
          return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
        });
      } else if (order === 'duration' && $scope.orderProperty !== 'duration') {
        $scope.songs.sort(function(a, b) {
          return parseFloat(a.duration) - parseFloat(b.duration);
        });
      } else if (order === 'numberOfPlay' && $scope.orderProperty !== 'numberOfPlay') {
        $scope.songs.sort(function(a, b) {
          return parseFloat(a.numberOfPlay) - parseFloat(b.numberOfPlay);
        });
      } else if (order === 'title' && $scope.orderProperty === 'title') {
        $scope.songs.reverse();
      } else if (order === 'duration' && $scope.orderProperty === 'duration') {
        $scope.songs.reverse();
      } else if (order === 'numberOfPlay' && $scope.orderProperty === 'numberOfPlay') {
        $scope.songs.reverse();
      }
      $scope.songs.map(addTrackToPlaylist);

      if ($scope.orderProperty === order) {
        $scope.orderProperty = '-' + order;
      } else if ($scope.orderProperty === '-' + order) {
        $scope.orderProperty = order;
      } else {
        $scope.orderProperty = order;
      }
    });
  }

  $scope.filterExeption = (filter) => {}

////////////////////////SHOW INSTRUMENTALS////////////////////////
  $scope.openInstrumental = (id) => {

    angularPlayer.stop();
    playSvgPath.setAttribute('d', playSvg.getAttribute('data-play'));
    angularPlayer.clearPlaylist(function() {
      $scope.songs.map(function(item) {
        return getOnSong(item, id);
      });
      if ($scope.openInst === id) {
        $scope.openInst = '';
        $scope.songs = $scope.songs.filter(removeInstrumental);
      } else {
        $scope.openInst = id;
        $scope.songs = $scope.songs.filter(removeInstrumental);
        const instrumentalReverse = $scope.thisSong.instrumental.reverse();
        instrumentalReverse.map(addInstrumentalToPlaylist);
        $scope.songs.map(addTrackToPlaylist);
      }
    });
  };

////////////////////////GET ALL SONGS////////////////////////

  $scope.getAllSongs = () => {
    return APIService.getAllSongs().then(function(response) {
      $scope.allSongs = response.data.map(transformKeys);
      $scope.allSongs.map(addTrackToPlaylist);
      $scope.songs = $scope.allSongs;
    }).catch(function(errMsg) {
      console.log('show profils members failed!');
    });
  }
  $scope.getAllSongs();

////////////////////////GET ALL AMBIANCES////////////////////////

  $scope.getAllAmbiance = () => {
    APIService.getAllAmbiance().then(function(response) {
      $scope.ambiances = response.data;
    }).catch(function(errMsg) {
      console.log('show ambiances failed!');
    });
  }
  $scope.getAllAmbiance();

////////////////////////GET ALL STYLES////////////////////////

  $scope.getAllStyle = () => {
    APIService.getAllStyle().then(function(response) {
      $scope.styles = response.data;
    }).catch(function(errMsg) {
      console.log('show styles failed!');
    });
  }
  $scope.getAllStyle();

////////////////////////GET ALL LENGTHS////////////////////////

  $scope.getAllLength = () => {
    APIService.getAllLength().then(function(response) {
      $scope.lengths = response.data;
    }).catch(function(errMsg) {
      console.log('show lengths failed!');
    });
  }
  $scope.getAllLength();

//////////////////////// GET ALL INSTRUMENT ////////////////////////
  $scope.getAllInstrument = () => {
    APIService.getAllInstrument().then(function(response) {
      $scope.instruments = response.data;
    }).catch(function(errMsg) {
      console.log('show instruments failed!');
    });
  }
  $scope.getAllInstrument();

  //////////////////////// HANDLE PLAYER ////////////////////////

  $scope.$on('track:id', function(event, data) {
    $scope.currentSong.title = angularPlayer.currentTrackData().title;
    $scope.currentSong.icon = angularPlayer.currentTrackData().icon;
    $scope.currentTrackId = data;
    angularPlayer.currentTrackData().integral ? APIService.updateNumberOfPlay(angularPlayer.currentTrackData().integral, data) : APIService.updateNumberOfPlay(data);
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
    console.log('hooooo');
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
    angularPlayer.stop();
    $scope.songs = [];
    $scope.filters.indexOf(name) === -1 ?
      $scope.filters.push(name) :
      $scope.filters.splice($scope.filters.indexOf(name), 1);
    $scope.allSongs.map(filterResult);
  }

  const filterResult = (item) => {
    if ($scope.filters.length === 0) {
      $scope.songs = $scope.allSongs;
    } else if (!$scope.filters.some(val => item.tags.indexOf(val) === -1) && $scope.songs.indexOf(item) === -1) {
      $scope.songs.push(item);
    } else if ($scope.songs.indexOf(item) !== -1 && $scope.filters.some(val => item.tags.indexOf(val) === -1)) {
      $scope.songs.splice($scope.songs.indexOf(item), 1);
    }
    const playlist = angularPlayer.getPlaylist();
    playlist.map(removeTrackToPlaylist);
    setTimeout(function() {
      $scope.songs.map(addTrackToPlaylist);
    }, 10);
  }


//////////////////////// NAV BAR ANIMATION ////////////////////////

  $('.nav-bar').css("background-color", 'rgb(34,34,34)');

}]);
