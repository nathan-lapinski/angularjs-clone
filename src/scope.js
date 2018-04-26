/* jshint globalstrict: true */
'use strict';

function Scope() {
	this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
	this.$$watchers.push({
		watchFn: watchFn,
		listenerFn: listenerFn
	});
};

Scope.prototype.$digest = function() {
	this.$$watchers.forEach(function(watcherObj){
		// This is very basic
		// We want to dirty check each watched value,
		// and call the listenerFn only if that value has changed.
		watcherObj.listenerFn();
	});
};