app.controller('playerCtrl', ['$scope', '$http', '$stateParams', 'playerService', 'APIService', '$rootScope', 'angularPlayer', function($scope, $http, $stateParams, playerService, APIService, $rootScope, angularPlayer){
  let volumeStatus = 0;
  $scope.volume = 90;
  $scope.isDisabled = true;

const transformKeys = obj => {
    result = {};
    Object.keys(obj).forEach(x => {
        const y = x.replace("_", "");
        result[y] = obj[x];
    });
    // console.log(result);
    return result;
}

const addTrackToPlaylist = (item) => {
    angularPlayer.addTrack(item);
}

$scope.ambianceFilter = [];
$scope.styleFilter = [];
$scope.durationFilter = [];
$scope.instrumentFilter = [];
const playSvg = document.querySelector('.icon-play');
const playSvgPath = playSvg.querySelector('path');

$scope.addFilter = (name, type) => {
    if (type.indexOf(name) === -1) {
        type.push(name);
    } else {
        type.splice(type.indexOf(name), 1);
    }
}

$scope.getAllSongs = () => {
    APIService.getAllSongs().then(function(response) {
        $scope.songs = response.data.map(transformKeys);
        $scope.songs.map(addTrackToPlaylist);
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}
$scope.getAllSongs();

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

$scope.$on('track:id', function(event, data) {
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
  if (angularPlayer.isPlayingStatus()) {
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

$scope.$watch('volume', function(newValue, oldValue){
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

}]);
