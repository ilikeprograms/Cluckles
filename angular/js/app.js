'use strict';

/* App Module */

window.clucklesApp = angular.module('clucklesApp', [
  'ngRoute',
  'clucklesBootstrapModule'
]);

clucklesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/editor', {
        templateUrl: 'bootstrap/templates/editorlayout.html',
      }).
      otherwise({
        redirectTo: '/editor'
      });
  }]);