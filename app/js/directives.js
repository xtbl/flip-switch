'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('flipSwitch', ['$compile','$templateCache', function($compile, $templateCache) {
    return {
        restrict:'A',
        // Todo:
        // transclude, add external attributes, watch, model
        template: '<label for="flip-1">Flip switch: {{ flipSwitchSelect }}</label><select ng-model="flipSwitchSelect" name="flip-1" id="flip-1" data-role="slider"><option value="off">Off</option><option value="on">On</option></select>',
        compile: function() {
            return {
                pre: function($scope, iElement, iAttrs) {
                    iElement.find('select').slider();
                    return null;
                }
            }
        },
        link: function(scope, element, attrs) {

        },

        replace: false
    };
  }]);
