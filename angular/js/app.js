'use strict';

/* App Module */

window.clucklesApp = angular.module('clucklesApp', [
  'ngRoute',
  'clucklesBootstrapModule',
  'clucklesmodule'
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
  
angular.module('clucklesApp').run(['$rootScope', 'cluckleseditor', function($rootScope, cluckleseditor) {
//    var clucklesInitialised = false;

    $rootScope.$on('$includeContentLoaded', function () {
//        if (!clucklesInitialised) {
            cluckleseditor.init();

//            clucklesInitialised = true;
//        }
    });
}]);