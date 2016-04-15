(function() {
	'use strict';

	angular
		.module('segmentoApp')
		.factory('itemsFactory', function($http, $firebaseArray) {
			var ref = new Firebase('https://segmento.firebaseio.com/');

			// return all items from this factory
			return {
				ref: $firebaseArray(ref)
			};
		});
})();