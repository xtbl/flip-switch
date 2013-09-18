'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('myApp.directives'));

  describe('flip-switch', function() {
    it('should render', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<div flip-switch config="flipSwitchConfig"></div>')($rootScope);
        console.log(element.find('select'));
        expect(1).toEqual(2);
//        element.find('select');
      });
    });
  });


//  describe('app-version', function() {
//    it('should print current version', function() {
//      module(function($provide) {
//        $provide.value('version', 'TEST_VER');
//      });
//      inject(function($compile, $rootScope) {
//        var element = $compile('<div flip-switch config="flipSwitchConfig"></div>')($rootScope);
//        expect(element.text()).toEqual('TEST_VER');
////        element.find('select');
//        console.log(element.find('select'));
//      });
//    });
//  });
});
