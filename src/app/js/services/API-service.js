app.service("APIService", function($http, API_ENDPOINT) {

    this.addSong = function(song) {
        return $http.post(API_ENDPOINT.url + '/addsong', song).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.addInstrumentalSong = function(song) {
        return $http.post(API_ENDPOINT.url + '/addInstrumentalSong', song).then(function(response) {
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

    this.updateNumberOfPlay = function(id, instrumentalId) {
      if (instrumentalId) {
        return $http.put(API_ENDPOINT.url + '/updateNumberOfPlay/' + id + '/' + instrumentalId).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
      } else {
          return $http.put(API_ENDPOINT.url + '/updateNumberOfPlay/' + id).then(function(response) {
              return response;
          }, function(error) {
              return error;
          });
      }
    };

    this.removeSong = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeSong/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeInstrumentalSong = function(songId, instrumentalId) {
        return $http.delete(API_ENDPOINT.url + '/removeInstrumentalSong/' + songId + '/' + instrumentalId).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };





    this.addAmbiance = function(ambiance) {
        return $http.post(API_ENDPOINT.url + '/addAmbiance', ambiance).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllAmbiance = function() {
        return $http.get(API_ENDPOINT.url + '/getAllAmbiance').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeAmbiance = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeAmbiance/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };






    this.addLength = function(length) {
        return $http.post(API_ENDPOINT.url + '/addLength', length).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllLength = function() {
        return $http.get(API_ENDPOINT.url + '/getAllLength').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeLength = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeLength/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };






    this.addStyle = function(style) {
        return $http.post(API_ENDPOINT.url + '/addStyle', style).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllStyle = function() {
        return $http.get(API_ENDPOINT.url + '/getAllStyle').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeStyle = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeStyle/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };







    this.addInstrument = function(instrument) {
        return $http.post(API_ENDPOINT.url + '/addInstrument', instrument).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllInstrument = function() {
        return $http.get(API_ENDPOINT.url + '/getAllInstrument').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeInstrument = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeInstrument/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

});
