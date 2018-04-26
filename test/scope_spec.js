/* jshint globalstrict: true */
/* global Scope: false */
'use strict';

describe('Scope', function() {
  it('can be constructed and used as an object', function() {
  	var scope = new Scope();
  	scope.aProp = 1;
  	expect(scope.aProp).toBe(1);
  });
});