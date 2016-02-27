'use strict';

/* App Module */

window.clucklesApp = angular.module('clucklesApp', [
  'ngRoute'
]);

clucklesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/editor', {
        templateUrl: 'templates/pages/editor.html',
      }).
      otherwise({
        redirectTo: '/editor'
      });
  }]);