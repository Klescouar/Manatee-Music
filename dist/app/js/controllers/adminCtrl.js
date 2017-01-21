app.controller('adminCtrl', ['$scope', '$http', '$stateParams', 'APIService', function($scope, $http, $stateParams, APIService){

$scope.show = "music";

$scope.song = {
    title: '',
    icon: '',
    filePath: '',
    duration: '',
};

$scope.ambiance = {name : ''};
$scope.style = {name : ''};
$scope.length = {name : ''};
$scope.instrument = {name : ''};


$scope.getAllSongs = () => {
    APIService.getAllSongs().then(function(response) {
        $scope.songs = response.data;
    }).catch(function(errMsg) {
        console.log('show profils members failed!');
    });
}

//ADD USERS
$scope.addSong = () => {
    APIService.addSong($scope.song).then(function(response) {}).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Song failed!');
    });
    $scope.getAllSongs();
};

$scope.removeSong = (id) => {
    APIService.removeSong(id).then(function(response) {
        console.log(response.data);
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
    console.log($scope.song);
}
$scope.handleSuccessSong = (data) => {
  console.log(data);
    if (data.length > 0) {
      $scope.song.filePath = data[0].filename;
      console.log($scope.song);
    } else {
        alert('Image trop petite ou dans un mauvais format (formats accéptés: jpg,png,jpeg)')
    }
}


$scope.getAllStyle = () => {
    APIService.getAllStyle().then(function(response) {
        $scope.styles = response.data;
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
        console.log(response.data);
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
        console.log(response.data);
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
        console.log(response.data);
    }).catch(function(errMsg) {
        console.log('remove Instrument failed!');
    });
    $scope.getAllInstrument();
}

$scope.getAllInstrument();








$scope.getAllAmbiance = () => {
    APIService.getAllAmbiance().then(function(response) {
      console.log(response.data);
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
        console.log(response.data);
    }).catch(function(errMsg) {
        console.log('remove Ambiance failed!');
    });
    $scope.getAllAmbiance();
}

$scope.getAllAmbiance();


















$('#upload-song').on('submit', function(event) {
    event.preventDefault();
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
});

// On form submit, handle the file uploads.
$('#upload-photos').on('submit', function(event) {
    event.preventDefault();

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
});

}
]);
