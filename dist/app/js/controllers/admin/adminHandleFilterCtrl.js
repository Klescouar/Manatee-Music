app.controller('adminHandleFilterCtrl', ['$scope', 'APIService', function($scope, APIService){

//////////////////////// GET ALL STYLES ////////////////////////

$scope.getAllStyle = () => {
    APIService.getAllStyle().then(function(response) {
        $scope.styles = response.data;
    }).catch(function(errMsg) {
        console.log('show style failed!');
    });
}

//////////////////////// ADD STYLE ////////////////////////

$scope.addStyle = () => {
    APIService.addStyle($scope.style).then(function(response) {
      $scope.getAllStyle();
    }).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Style failed!');
    });
};

//////////////////////// REMOVE STYLE ////////////////////////

$scope.removeStyle = (id) => {
    APIService.removeStyle(id).then(function(response) {
      $scope.getAllStyle();
    }).catch(function(errMsg) {
        console.log('remove style failed!');
    });
}

$scope.getAllStyle();







//////////////////////// GET ALL LENGTHS ////////////////////////

$scope.getAllLength = () => {
    APIService.getAllLength().then(function(response) {
        $scope.lengths = response.data;
    }).catch(function(errMsg) {
        console.log('show Length failed!');
    });
}

//////////////////////// ADD LENGTH ////////////////////////

$scope.addLength = () => {
    APIService.addLength($scope.length).then(function(response) {
      $scope.getAllLength();
    }).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Length failed!');
    });
};

//////////////////////// REMOVE LENGTH ////////////////////////

$scope.removeLength = (id) => {
    APIService.removeLength(id).then(function(response) {
      $scope.getAllLength();
    }).catch(function(errMsg) {
        console.log('remove Length failed!');
    });
}

$scope.getAllLength();


//////////////////////// GET ALL INSTRUMENTS ////////////////////////

$scope.getAllInstrument = () => {
    APIService.getAllInstrument().then(function(response) {
        $scope.instruments = response.data;
    }).catch(function(errMsg) {
        console.log('show Instrument failed!');
    });
}

//////////////////////// ADD INSTRUMENT ////////////////////////

$scope.addInstrument = () => {
    APIService.addInstrument($scope.instrument).then(function(response) {
      $scope.getAllInstrument();
    }).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Instrument failed!');
    });
};

//////////////////////// REMOVE INSTRUMENT ////////////////////////

$scope.removeInstrument = (id) => {
    APIService.removeInstrument(id).then(function(response) {
      $scope.getAllInstrument();
    }).catch(function(errMsg) {
        console.log('remove Instrument failed!');
    });
}

$scope.getAllInstrument();







//////////////////////// GET ALL AMBIANCES ////////////////////////

$scope.getAllAmbiance = () => {
    APIService.getAllAmbiance().then(function(response) {
        $scope.ambiances = response.data;
    }).catch(function(errMsg) {
        console.log('show Ambiance failed!');
    });
}

//////////////////////// ADD AMBIANCE ////////////////////////

$scope.addAmbiance = () => {
    APIService.addAmbiance($scope.ambiance).then(function(response) {
      $scope.getAllAmbiance();
    }).catch(function(errMsg) {
        const alertPopup = $window.alert('Add Ambiance failed!');
    });
};

//////////////////////// REMOVE AMBIANCE ////////////////////////

$scope.removeAmbiance = (id) => {
    APIService.removeAmbiance(id).then(function(response) {
      $scope.getAllAmbiance();
    }).catch(function(errMsg) {
        console.log('remove Ambiance failed!');
    });
}

$scope.getAllAmbiance();

}]);
