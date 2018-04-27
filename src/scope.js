/* jshint globalstrict: true */
'use strict';

function Scope() {
	this.$$watchers = [];
}

// functions are equal only to themselves, so it makes a decent unique initial val
// although a first checked flag similar to what Angular does.
function initWatchVal() {}

Scope.prototype.$watch = function(watchFn, listenerFn) {
	this.$$watchers.push({
		watchFn: watchFn,
		listenerFn: listenerFn || function() {},
		last: initWatchVal
	});
};

Scope.prototype.$digest = function() {
	var self = this;
	var newValue, oldValue;

	this.$$watchers.forEach(function(watcherObj) {
		newValue = watcherObj.watchFn(self);
		oldValue = watcherObj.last;
		if (newValue !== oldValue) {
			watcherObj.last = newValue;
			watcherObj.listenerFn(newValue, (oldValue === initWatchVal ? newValue : oldValue), self);
		}
	});
};