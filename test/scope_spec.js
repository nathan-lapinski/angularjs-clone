/* jshint globalstrict: true */
/* global Scope: false */
'use strict';

describe('Scope', function() {
  it('can be constructed and used as an object', function() {
  	var scope = new Scope();
  	scope.aProp = 1;
  	expect(scope.aProp).toBe(1);
  });

  describe('digest', function() {
  	var scope;

  	beforeEach(function() {
  		scope = new Scope();
  	});

  	it('calls the listener function of a watch on first $digest', function() {
  		var watchFn = function() { return 'way'; };
  		var listenerFn = jasmine.createSpy();
  		scope.$watch(watchFn, listenerFn);

  		scope.$digest();

  		expect(listenerFn).toHaveBeenCalled();
  	});

  	it('calls the watch function with the scope as the argument', function() {
  		var watchFn = jasmine.createSpy();
  		var listenerFn = function() {};

  		scope.$watch(watchFn, listenerFn);
  		scope.$digest();

  		expect(watchFn).toHaveBeenCalledWith(scope);
  	});

  	it('calls the listener function associated with the watcher only when the value has changed', function() {
  		scope.watchedVal = 'val';
  		scope.counter = 0;

  		scope.$watch(function(scope) { return scope.watchedVal; },
  			function(newVal, oldVal, scope) {
  			  scope.counter++;
  			}
  		);

  		expect(scope.counter).toBe(0);
  		scope.$digest();

  		expect(scope.counter).toBe(1);

  		scope.$digest();

  		expect(scope.counter).toBe(1);

  		scope.watchedVal = 'changed';

  		expect(scope.counter).toBe(1);

  		scope.$digest();

  		expect(scope.counter).toBe(2);
  	});
  });

});