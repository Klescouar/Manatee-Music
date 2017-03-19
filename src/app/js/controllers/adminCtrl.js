app.controller('adminCtrl', ['$scope', '$http', '$stateParams', 'APIService', function($scope, $http, $stateParams, APIService){

$scope.show = "addSong";

$scope.song = {
    title: '',
    icon: '',
    url: '',
    artist:'lol',
    duration: '',
    ambiance: [],
    style: [],
    instrument: []
};

$scope.ambiance = {name : ''};
$scope.style = {name : ''};
$scope.length = {name : ''};
$scope.instrument = {name : ''};

$scope.addElementToSong = (name, type) => {
  if (type.indexOf(name) === -1) {
    type.push(name);
  } else {
      type.splice(type.indexOf(name), 1);
  }
};


$scope.getAllSongs = () => {
    APIService.getAllSongs().then(function(response) {
        $scope.songs = response.data;
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}

$scope.addSong = () => {
    APIService.addSong($scope.song).then(function(response) {
    }).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Song failed!');
    });
    $scope.getAllSongs();
};

$scope.removeSong = (id) => {
    APIService.removeSong(id).then(function(response) {
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
    $scope.getAllSongs();
}

$scope.getAllSongs();

$scope.uploadFiles = (formData) => {
    $.ajax({url: '/api/upload_photos', method: 'post', data: formData, processData: false, contentType: false}).done($scope.handleSuccess).fail(function(xhr, status) {
        alert(status);
    });
}
$scope.uploadSong = (formData) => {
  console.log('lol');
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
      $scope.song.url = '../../assets/song/' + data[0].filename;
    } else {
        alert('Image trop petite ou dans un mauvais format (formats accéptés: jpg,png,jpeg)')
    }
}


$scope.getAllStyle = () => {
    APIService.getAllStyle().then(function(response) {
        $scope.styles = response.data;
        console.log(response.data);
    }).catch(function(errMsg) {
        console.log('show style failed!');
    });
}

$scope.addStyle = () => {
    APIService.addStyle($scope.style).then(function(response) {}).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Style failed!');
    });
    $scope.getAllStyle();
};

$scope.removeStyle = (id) => {
    APIService.removeStyle(id).then(function(response) {
    }).catch(function(errMsg) {
        console.log('remove style failed!');
    });
    $scope.getAllStyle();
}

$scope.getAllStyle();








$scope.getAllLength = () => {
    APIService.getAllLength().then(function(response) {
        $scope.lengths = response.data;
    }).catch(function(errMsg) {
        console.log('show Length failed!');
    });
}

$scope.addLength = () => {
    APIService.addLength($scope.length).then(function(response) {}).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Length failed!');
    });
    $scope.getAllLength();
};

$scope.removeLength = (id) => {
    APIService.removeLength(id).then(function(response) {
    }).catch(function(errMsg) {
        console.log('remove Length failed!');
    });
    $scope.getAllLength();
}

$scope.getAllLength();








$scope.getAllInstrument = () => {
    APIService.getAllInstrument().then(function(response) {
        $scope.instruments = response.data;
    }).catch(function(errMsg) {
        console.log('show Instrument failed!');
    });
}

$scope.addInstrument = () => {
    APIService.addInstrument($scope.instrument).then(function(response) {}).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Instrument failed!');
    });
    $scope.getAllInstrument();
};

$scope.removeInstrument = (id) => {
    APIService.removeInstrument(id).then(function(response) {
    }).catch(function(errMsg) {
        console.log('remove Instrument failed!');
    });
    $scope.getAllInstrument();
}

$scope.getAllInstrument();








$scope.getAllAmbiance = () => {
    APIService.getAllAmbiance().then(function(response) {
        $scope.ambiances = response.data;
    }).catch(function(errMsg) {
        console.log('show Ambiance failed!');
    });
}

$scope.addAmbiance = () => {
    APIService.addAmbiance($scope.ambiance).then(function(response) {}).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Ambiance failed!');
    });
    $scope.getAllAmbiance();
};

$scope.removeAmbiance = (id) => {
    APIService.removeAmbiance(id).then(function(response) {
    }).catch(function(errMsg) {
        console.log('remove Ambiance failed!');
    });
    $scope.getAllAmbiance();
}

$scope.getAllAmbiance();


















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

}
]);
