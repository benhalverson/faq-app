'use strict';
angular
  .module('faqApp', ['ui-router'])
  .config(function ($urlRouteProvider, $stateProvider) {
    $urlRouteProvider.otherwise('/')

    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: 'templates/create.html',
        controller: 'createCtrl'
      })
      .state('edit', {
        url: '/edit/:id',
        templateUrl: 'templates/edit.html',
        controller: 'editCtrl'
      })
  });
