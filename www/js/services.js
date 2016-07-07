angular.module('securilog.services', [])

.value('People', {
  "toAdd": []
})

.factory('Locations', function($http){


  return{
    /**
     * returns all Locations from the Database
     * @returns {Promise}
       */
    all: function(){
      return new Promise(function(resolve,reject){
        $http.get('https://securilog.herokuapp.com/locations').then(function(response){
          resolve(response.data);
        }, function(error){
          console.log(error);
        })
      })
    }
  }
})

.factory('Eventservice', function($http){

  /*var getEventsfrom = function(createdBy){
    $http.get('https://securilog.herokuapp.com/events' + createdBy).then(function(response){
      return response.data;
    })
  };
*/
  return {
    /**
     * gets all events from the Database
     * @returns {Promise}
       */
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
    /**
     * Gets the event with the ID form the parameter
     * @param eventId {int}
     * @returns {Promise}
       */
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
    /**
     * returns an Array of all person with the provided IDs
     * @param IdArray {Array}
     * @returns {Promise}
       */
    getPersonById: function(IdArray){
      return new Promise(function(resolve, reject) {
        var resultArray =[];
        for( var i = 0; i<IdArray.length; i++){
          $http.get('https://securilog.herokuapp.com/people/' + IdArray[i]).then(function (response) {
            resultArray.push(response.data);
          }, function (error) {
            console.log(error);
            reject();
          })
        }
        resolve(resultArray);
      })
    },
    /**
     * Takes an event-JSON Objekt and sends it to the Server
     * @param eventData {{
        date: {type: date},
        description: String,
        del_req: {type: Boolean, default: false},
        inv_person: [{type: Object, ref: 'Person'}],
        createdBy: {type: Object, ref: 'User'},
        location: {type: Object, ref: 'Location'},
        tags: [String]
        }}
     * @returns {Promise}
       */
    newEvent: function(eventData){
      return new Promise(function (resolve, reject) {
        var config = {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }};
        var data ={
          date: eventData.date,
          description: eventData.desc,
          inv_person: eventData.inv,
          location: eventData.location,
          tags: eventData.tags
        };
        http.post('https://securilog.herokuapp.com/event/new', data, config).then(function(success){
          console.log('event created');
        })
      })
      }
  }
})

.factory('Search', function($http){
  return {
    /**
     * returns all events in which the namen person was involved
     * @param nameString {string}
     * @returns {Promise}
       */
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
