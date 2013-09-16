'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('flipSwitchCtrl',['$scope', function($scope) {
    $scope.flipSwitchConfig = { "stateLabels" : {"first":'ON', "second":'OFF'} };
  }]);