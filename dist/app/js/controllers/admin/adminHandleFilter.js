app.controller('adminHandleFilterCtrl', ['$scope', 'APIService', function($scope, APIService){


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

}]);
