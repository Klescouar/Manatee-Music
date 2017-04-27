app.controller('adminAddSongCtrl', ['$scope', 'APIService', function($scope, APIService){
  $scope.choice = '';
$scope.ambiance = {
    name: ''
};
$scope.style = {
    name: ''
};
$scope.length = {
    name: ''
};
$scope.instrument = {
    name: ''
};
$scope.song = {
    title: '',
    icon: '',
    url: '',
    duration: '',
    artist: 'Manatee Music Team',
    tags: [],
    numberOfPlay : 0,
};

////////////////////////////////////////// ADD SONGS //////////////////////////////////////////

$scope.getAllSongs = () => {
    APIService.getAllSongs().then(function(response) {
        $scope.songs = response.data;
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}

$scope.addElementToSong = (name) => {
    if ($scope.song.tags.indexOf(name) === -1) {
        $scope.song.tags.push(name);
    } else {
        $scope.song.tags.splice($scope.song.tags.indexOf(name), 1);
    }
};

$scope.addSong = () => {
  if ($scope.song.integral) {
    APIService.addInstrumentalSong($scope.song).then(function(response) {}).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Song failed!');
    });
  } else {
    APIService.addSong($scope.song).then(function(response) {}).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Song failed!');
    });
  }
};

$scope.uploadFiles = (formData) => {
    $.ajax({url: '/api/upload_photos', method: 'post', data: formData, processData: false, contentType: false}).done($scope.handleSuccess).fail(function(xhr, status) {
        alert(status);
    });
}
$scope.uploadSong = (formData) => {
    $.ajax({url: '/api/upload_song', method: 'post', data: formData, processData: false, contentType: false}).done($scope.handleSuccessSong).fail(function(xhr, status) {
        alert(status);
    });
}

$scope.handleSuccess = (data) => {
    if (data.length > 0) {
        $scope.song.icon = data[0].filename;
    } else {
        alert('Image trop petite ou dans un mauvais format (formats accéptés: jpg,png,jpeg)')
    }
}
$scope.handleSuccessSong = (data) => {
    if (data.length > 0) {
        const newAudio = new Audio();
        newAudio.src = '../../../assets/song/Résidents.mp3';
        newAudio.addEventListener('loadedmetadata', function() {
            $scope.song.duration = newAudio.duration;
            switch (true) {
                case($scope.song.duration < 30):
                    $scope.song.tags.push('Moins de 30sec');
                    break;
                case($scope.song.duration > 30 && $scope.song.duration < 60):
                    $scope.song.tags.push('De 30sec à 1min');
                    break;
                case($scope.song.duration < 60 && $scope.song.duration < 120):
                    $scope.song.tags.push('De 1min à 2min');
                    break;
                case($scope.song.duration < 120 && $scope.song.duration < 180):
                    $scope.song.tags.push('De 2min à 3min');
                    break;
                case($scope.song.duration > 180):
                    $scope.song.tags.push('Plus de 3min');
                    break;
            }
        });
        $scope.song.url = '../../assets/song/' + data[0].filename;
    } else {
        alert('Image trop petite ou dans un mauvais format (formats accéptés: jpg,png,jpeg)')
    }
}

$scope.submitSong = function() {
    // Get the files from input, create new FormData.
    const files = $('#song-input').get(0).files,
        formData = new FormData();

    if (files.length === 0) {
        alert('Aucune photo séléctionnée.');
        return false;
    }

    // Append the files to the formData.
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        formData.append('photos[]', file, file.name);
    }
    // Note: We are only appending the file inputs to the FormData.
    $scope.uploadSong(formData);
};

// On form submit, handle the file uploads.
$scope.submitPhoto = function() {
    // Get the files from input, create new FormData.
    const files = $('#photos-input').get(0).files,
        formData = new FormData();

    if (files.length === 0) {
        alert('Aucune photo séléctionnée.');
        return false;
    }

    // Append the files to the formData.
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        formData.append('photos[]', file, file.name);
    }

    // Note: We are only appending the file inputs to the FormData.
    $scope.uploadFiles(formData);
};

$scope.getAllStyle = () => {
    APIService.getAllStyle().then(function(response) {
        $scope.styles = response.data;
    }).catch(function(errMsg) {
        console.log('show style failed!');
    });
}

$scope.getAllLength = () => {
    APIService.getAllLength().then(function(response) {
        $scope.lengths = response.data;
    }).catch(function(errMsg) {
        console.log('show Length failed!');
    });
}

$scope.getAllInstrument = () => {
    APIService.getAllInstrument().then(function(response) {
        $scope.instruments = response.data;
    }).catch(function(errMsg) {
        console.log('show Instrument failed!');
    });
}

$scope.getAllAmbiance = () => {
    APIService.getAllAmbiance().then(function(response) {
        $scope.ambiances = response.data;
    }).catch(function(errMsg) {
        console.log('show Ambiance failed!');
    });
}

$scope.getAllInstrument();
$scope.getAllStyle();
$scope.getAllLength();
$scope.getAllAmbiance();
$scope.getAllSongs();

}]);
