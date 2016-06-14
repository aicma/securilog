angular.module('securilog.controllers', ['securilog.services'])

.controller('LandingCtrl', function($scope){

})

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
        Eventservice.getInvolved(result.inv_person).then(function (resultArray) {
          $scope.involved = resultArray;
          $scope.$apply();
          $ionicLoading.hide();
        });
    });
  });

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
      console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
      console.log("The loading indicator is now hidden");
    });
  };

})

.controller('SearchCtrl', function($scope, Eventservice){})

.controller('SearchResultCtrl', function($scope) {
    $scope.results =
  })
.controller('NewCtrl', function($scope){

})
;
