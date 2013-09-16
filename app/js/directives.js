'use strict';

/* Directives */

/**
 * Flip Switch object
 */
    var flipSwitch = function ($scope, options) {
        var defaults = {
            "label": 'Flip Switch Label',
            "state" : 'off',
            "help" : undefined,
            "stateLabels" : {"first":'ON', "second":'OFF'}
        };
        var self = this;

        console.log('defaults: '+JSON.stringify(defaults));
        console.log('options: '+JSON.stringify(options));


        self.config = $.extend(defaults, self.config, options);
        console.log('self.config: '+JSON.stringify(self.config));

        self.init = function () {
            $scope.flipSwitchConfig.label = self.config.label;
            $scope.flipSwitchConfig.state = self.config.state;
            $scope.flipSwitchConfig.help = self.config.help;
            $scope.flipSwitchConfig.stateLabels = self.config.stateLabels;

            console.log('self.config: '+ JSON.stringify(self.config) );
        }
    };
/**
 * Flip Switch object ends
 */

angular.module('myApp.directives', []).
  directive('flipSwitch', ['$compile','$templateCache', function($compile, $templateCache) {
    return {
        restrict:'A',
        scope: true,//{ flipSwitchConfig: '=config' },
        // Todo:
        // transclude, add external attributes, watch, model
        template: '<label for="flip-1">temp label: {{ flipSwitchConfig.label }}  </label>State: {{ flipSwitchSelect }} <a href="#">Help</a><select ng-model="flipSwitchSelect" name="flip-1" id="flip-1" data-role="slider"><option value="off">Off</option><option value="on">{{ flipSwitchConfig.stateLabels.first }}</option></select>',
        // Todo: use defaults to compile then watch if there are config values set
        compile: function () {
            return {
                pre: function ($scope, iElement, iAttrs) {

                    var fSwitch = new flipSwitch($scope, $scope.flipSwitchConfig);
                    fSwitch.init();
                    iElement.find('select').slider();
                    //iElement.find('select').trigger('create');
                    iElement.find('select').bind( "change", function(event, ui) {
                        console.log('slider change: '+ event);
                        $scope.flipSwitchState = $scope.flipSwitchSelect;
                        console.log('switch state: '+ $scope.flipSwitchState);
                    });
                }
            }
        },
        link: function(scope, element, attrs) {
            //element.find('select').slider();
            console.log('flipswitch value: '+ scope.flipSwitchSelect);
            console.log('label: '+ attrs.config);
            console.log('scope.$parent.flipSwitchConfig.label: '+ scope.$parent.flipSwitchConfig.label);
            console.log('scope.flipSwitchConfig.label inside directive: '+ scope.flipSwitchConfig.label);
            element.find('select').slider('refresh');

            element.find('label').attr('label', attrs.config.label);


            return null;
        },

        replace: false
    };
  }]);
