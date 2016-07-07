// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('securilog', ['ionic', 'securilog.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'EventCtrl'
    })

    // Each tab has its own nav history stack:
    .state('landing', {
      url:'/landing',
      templateUrl: 'templates/landing.html',
      controller: 'LandingCtrl'
    })

    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
    })

    .state('searchresult', {
      url: '/search/:searchString',
      templateUrl: 'templates/searchresult.html',
      controller: 'SearchResultCtrl'
    })

    .state('new', {
      url: '/new',
      templateUrl: 'templates/new.html',
      controller: 'NewCtrl'
    })

    .state('people', {
      url: '/people',
      templateUrl: 'templates/people.html',
      controller: 'PeopleCtrl'
    })

    .state('events', {
      url: '/events',
      templateUrl: 'templates/events.html',
      controller: 'EventCtrl'
    })

    .state('eventDetail', {
      url: '/events/:eventID',
      templateUrl: 'templates/event-detail.html',
      controller: 'EventDetailCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');
});

