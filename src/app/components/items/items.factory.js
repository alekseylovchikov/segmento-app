(function() {
	'use strict';

	angular
		.module('segmentoApp')
		.factory('itemsFactory', ['$firebaseArray', function($firebaseArray) {
            var ref = new Firebase('https://segmento.firebaseio.com/');

            // return all items from database
            return {
                ref: $firebaseArray(ref)
            };
		}]);
})();