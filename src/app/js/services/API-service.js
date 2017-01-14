app.service("APIService", function($http, API_ENDPOINT) {

    this.addSong = function(song) {
        return $http.post(API_ENDPOINT.url + '/addsong', song).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllSongs = function() {
        return $http.get(API_ENDPOINT.url + '/getAllSongs').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeSong = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeSong/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };



});
