angular.module('securilog.controllers', ['securilog.services'])

.controller('EventCtrl', function($scope, $ionicLoading, Eventservice){

  $scope.$on('$ionicView.beforeEnter', function(){
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    Eventservice.allEvents().then(function(result){
      $scope.events = result;
      console.log(result);
      $scope.$apply();
      $ionicLoading.hide();
    });

  });

})

.controller('EventDetailCtrl', function($ionicLoading, $scope, $stateParams, Eventservice){
  $scope.$on('$ionicView.enter', function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    Eventservice.getOne($stateParams.eventID).then(function (result) {
        console.log(result);
        $scope.event = result;
        Eventservice.getPersonById(result.inv_person).then(function (resultArray) {
          $scope.involved = resultArray;
          $scope.$apply();
          $ionicLoading.hide();
        });
    });
  });
})

.controller('SearchCtrl', function($scope){
  $scope.search = function(){
    var searchString = document.getElementById('personfield').value;
    window.location.href = '#/search/' + searchString;
  }
})

.controller('SearchResultCtrl', function($scope, $stateParams, $ionicLoading, Search) {
  $scope.$on('$ionicView.enter', function () {
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});

    Search.findEventsbyName($stateParams.searchString).then(function (result) {
      console.log(result);
      $scope.results = result;
      $scope.$apply();
      $ionicLoading.hide();
    });
  });
})

.controller('NewCtrl', function($scope, $ionicPopup, Eventservice, Locations, People){
  $scope.$on('$ionicView.enter', function(){
    Locations.all().then(function(success){
      $scope.locations = success;
      //console.log($scope.locations);
      $scope.$apply();
    });
  });
  $scope.date = new Date();

  $scope.submit = function() {
    var data ={
      date: document.getElementById('datefield').value,
      description: document.getElementById('description').value,
      inv_person: People.toAdd,
      location: document.getElementById('locationfield').value,
      tags: document.getElementById('tags').value.split(" ")
    };

    if(data.description != null && data.inv_person.length != 0) {
      console.log(data);
      //Eventservice.newEvent(data);
    }else{
      console.log("we are working on this");
      $ionicPopup.alert({
          title: 'Not enough Data',
          template: 'please add at least one person and add a description!'
      });
    }


  };

})

.controller('PeopleCtrl', function($http, $scope){
  $scope.$on('$ionicView.enter', function(){
    $http.get('https://securilog.herokuapp.com/people').then(function(response){
      $scope.people = response.data;
      console.log(response.data);
      $scope.$apply();
    })
  });
})
;
