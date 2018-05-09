/* jshint globalstrict: true */
'use strict';

var DIGEST_CYCLE_LIMIT = 10;

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

// helper function which does one run of the digest cycle
Scope.prototype.$$digestOnce = function() {
	var self = this;
	var newValue, oldValue, dirty;

	this.$$watchers.forEach(function(watcherObj) {
		newValue = watcherObj.watchFn(self);
		oldValue = watcherObj.last;
		if (newValue !== oldValue) {
			watcherObj.last = newValue;
			watcherObj.listenerFn(newValue, (oldValue === initWatchVal ? newValue : oldValue), self);
			dirty = true;
		}
	});
	return dirty;
};

// Run digest cycle until no changes are found.
// TODO: Need to avoid infinite loops by digesting only a set number of times.
Scope.prototype.$digest = function() {
	var dirty;
	var ttl = DIGEST_CYCLE_LIMIT;

	do {
		dirty = this.$$digestOnce();
		if (dirty && !(ttl--)) {
			throw 'max number of digest cycles has been exceeded';
		}
	} while (dirty);
};
