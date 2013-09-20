'use strict';

/* Directives */


angular.module('myApp.directives', []);
/**
 * Flip Switch object
 */
    var flipSwitch = function ($scope, options, $templateCache, $http, $q) {
        var defaults = {
            "label": 'Flip Switch Label',
            "state" : 'false',
            "help" : undefined,
            "stateLabels" : {"first":'ON', "second":'OFF'},
            "flipSwitchChangeState" : function() {

                if($scope.flipSwitchSelect === "true") {
                    $scope.flipSwitchSelect = "false";
                    $scope.switchBtnPosition = "0%";
                } else {
                    $scope.flipSwitchSelect = "true";
                    $scope.switchBtnPosition = "100%";
                }
            },
            // default directive template
            "ngFlipSwitch": "ngFlipSwitch"
        };

        var self = this;


        self.config = $.extend(defaults, self.config, options);

    self.initTemplates = function() {
        var templates = ['ngFlipSwitch'];
        var promises = [];
        angular.forEach(templates, function(template) {
            promises.push( self.getTemplate(template) );
        });

        return $q.all(promises);
    };

    self.getTemplate = function (key) {
        var t = self.config[key];
        var tmplBaseDir = 'templates/';
        var uKey = tmplBaseDir + key + ".html";
        var p = $q.defer();
        if (t) {
            $http.get(uKey, {
                cache: $templateCache
            })
                .success(function(data){
                    $templateCache.put(uKey, data);
                    p.resolve();
                })
                .error(function(err){
                    p.reject("Could not load template: " + t);
                });
        } else if (t) {
            $templateCache.put(uKey, t);
            p.resolve();
        } else {
            var dKey = key + ".html";
            $templateCache.put(uKey, $templateCache.get(dKey));
            p.resolve();
        }

        return p.promise;
    };

    self.init = function () {
        return self.initTemplates().then(function(){
            $scope.flipSwitchConfig.label = self.config.label;
            $scope.flipSwitchConfig.state = self.config.state;
            $scope.flipSwitchConfig.help = self.config.help;
            $scope.flipSwitchConfig.stateLabels = self.config.stateLabels;
            $scope.flipSwitchChangeState = self.config.flipSwitchChangeState;
            $scope.flipSwitchSelect = self.config.state;
        });

        }
    };
/**
 * Flip Switch object ends
 */

angular.module('myApp.directives', []).
  directive('flipSwitch', ['$compile','$templateCache', '$http', '$q', function($compile, $templateCache, $http, $q) {
    return {
        restrict:'A',
        scope: true,
        replace: false,
        compile: function(element, attrs) {
            // returns link function
            return function (scope, iElement, iAttrs) {
                var fSwitch = new flipSwitch(scope, scope.flipSwitchConfig, $templateCache, $http, $q);
                fSwitch.init().then(function(){
                    iElement.append($compile($templateCache.get('templates/ngFlipSwitch.html'))(scope));
                    iElement.find('select').bind( "change", function(event, ui) {
                        scope.flipSwitchState = scope.flipSwitchSelect;
                    });
                    iElement.find('select').slider();
                    // reproduce the same behavior if the component is clicked in the surrounding area
                    iElement.find('.ng-flip-switch-click-area').bind( "click", function(event, ui) {
                        iElement.find('a.ui-slider-handle').attr('style','left: ' + scope.switchBtnPosition + ';');
                        iElement.find('span.ui-slider-label.ui-slider-label-a').attr('style','width: ' + scope.switchBtnPosition + ';');
                    });
                });
            }
        }
    };
  }]);
