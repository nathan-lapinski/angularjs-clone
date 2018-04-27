/* jshint globalstrict: true */
'use strict';

function Scope() {
	this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
	this.$$watchers.push({
		watchFn: watchFn,
		listenerFn: listenerFn,
		last: undefined
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
			watcherObj.listenerFn(newValue, oldValue, self);
		}
	});
};