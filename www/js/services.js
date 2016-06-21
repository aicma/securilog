angular.module('securilog.services', [])

.factory('Eventservice', function($http){

  var getEventsfrom = function(createdBy){
    $http.get('https://securilog.herokuapp.com/events' + createdBy).then(function(response){
      return response.data;
    })
  };

  return {
    allEvents: function () {
      return new Promise(function (resolve, reject) {
        $http.get('https://securilog.herokuapp.com/events').then(function (response) {
          resolve(response.data);
        }, function (error) {
          console.log(error);
          reject();
        })
      })
    },
    getOne: function (eventId) {
      return new Promise(function (resolve, reject) {
        $http.get('https://securilog.herokuapp.com/events/' + eventId).then(function (response) {
          resolve(response.data);
        }, function (error) {
          console.log(error);
          reject();
        })
      })
    },
    getInvolved: function(involvedIds){
      return new Promise(function(resolve, reject) {
        var resultArray =[];
        for( var i = 0; i<involvedIds.length; i++){
          $http.get('https://securilog.herokuapp.com/people/' + involvedIds[i]).then(function (response) {
            resultArray.push(response.data);
          }, function (error) {
            console.log(error);
            reject();
          })
        }
        resolve(resultArray);
      })
    }
  }
})

.factory('Search', function($http){
  return {

    findEventsbyName: function(nameString){
      return new Promise(function (resolve, reject) {
        $http.get('https://securilog.herokuapp.com/events/search?name=' + nameString).then(function (response) {
          resolve(response.data);
        }, function (error) {
          console.log(error);
          reject();
        })
      })
    }
  }
})
;
