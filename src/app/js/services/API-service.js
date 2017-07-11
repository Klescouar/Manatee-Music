app.service("APIService", function($http, API_ENDPOINT) {

    this.addSong = function(song) {
        return $http.post(API_ENDPOINT.url + '/songs', song).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.addInstrumentalSong = function(song) {
        return $http.post(API_ENDPOINT.url + '/instrumentals', song).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllSongs = function() {
        return $http.get(API_ENDPOINT.url + '/songs').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.updateNumberOfPlay = function(id, instrumentalId) {
      if (instrumentalId) {
        return $http.put(API_ENDPOINT.url + '/songs/' + id + '/' + instrumentalId).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
      } else {
          return $http.put(API_ENDPOINT.url + '/songs/' + id).then(function(response) {
              return response;
          }, function(error) {
              return error;
          });
      }
    };

    this.removeSong = function(id) {
        return $http.delete(API_ENDPOINT.url + '/songs/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeInstrumentalSong = function(songId, instrumentalId) {
        return $http.delete(API_ENDPOINT.url + '/instrumentals/' + songId + '/' + instrumentalId).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };





    this.addAmbiance = function(ambiance) {
        return $http.post(API_ENDPOINT.url + '/ambiances', ambiance).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllAmbiance = function() {
        return $http.get(API_ENDPOINT.url + '/ambiances').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeAmbiance = function(id) {
        return $http.delete(API_ENDPOINT.url + '/ambiances/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };






    this.addLength = function(length) {
        return $http.post(API_ENDPOINT.url + '/lengths', length).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllLength = function() {
        return $http.get(API_ENDPOINT.url + '/lengths').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeLength = function(id) {
        return $http.delete(API_ENDPOINT.url + '/lengths/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };






    this.addStyle = function(style) {
        return $http.post(API_ENDPOINT.url + '/styles', style).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllStyle = function() {
        return $http.get(API_ENDPOINT.url + '/styles').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeStyle = function(id) {
        return $http.delete(API_ENDPOINT.url + '/styles/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };







    this.addInstrument = function(instrument) {
        return $http.post(API_ENDPOINT.url + '/instruments', instrument).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllInstrument = function() {
        return $http.get(API_ENDPOINT.url + '/instruments').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeInstrument = function(id) {
        return $http.delete(API_ENDPOINT.url + '/instruments/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.sendMail = function(userInfos) {
        return $http.post(API_ENDPOINT.url + '/mail', userInfos).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

});
