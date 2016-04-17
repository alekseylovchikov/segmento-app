(function() {
	'use strict';

	angular
		.module('segmentoApp')
		.controller('MainController', ['$scope', 'itemsFactory', function($scope, itemsFactory) {
            // init default sort
            $scope.sortType = 'id';
            $scope.sortReverse = false;

            // total sum
            function total() {
                var sum = 0;

                for (var i = 0; i < $scope.data.length; i++) {
                    sum += $scope.data[i].sum;
                }

                return sum;
            }

            // load all items from databse
            $scope.data = itemsFactory.ref;

            $scope.data.$loaded().then(function() {
                // load total sum to scope
                $scope.total = total();
            });

            // show modal window for add new item
            $scope.showModal = function(editNumber) {
                if (editNumber === undefined) {
                    $scope.numberOfItem = $scope.data.length + 1;
                } else {
                    $scope.numberOfItem = editNumber;
                }

                $scope.show = true;
            };

            // close modal
            $scope.closeModal = function() {
                $scope.show = false;
                setTimeout(function() {
                    $scope.item = null;
                    $scope.editing = false;
                }, 300);
            };

            // save new item to scope data
            $scope.saveNewItem = function(item) {
                if (item && item.sum >= -1000 && item.sum <= 1000) {
                    var idItem = $scope.data.length + 1;
                    var newItem = {
                        id: idItem,
                        sum: parseFloat(item.sum),
                        description: item.description || ''
                    };

                    $scope.data.$add(newItem);
                    // recheck total sum
                    $scope.data.$loaded().then(function() {
                        // load sum to scope
                        $scope.total = total();
                    });
                    // close modal
                    $scope.closeModal();
                }
            };

            // load data to form
            $scope.editItem = function(item) {
                $scope.editing = true;
                $scope.showModal(item.id);
                $scope.item = $scope.data.$getRecord(item.$id);
            };

            // saving edited data to database
            $scope.saveEdit = function(item) {
                if (item) {
                    item.sum = parseFloat(item.sum);

                    $scope.data.$save(item).then(function() {
                        $scope.closeModal();
                        // recheck total sum
                        $scope.data.$loaded().then(function() {
                            // load sum to scope
                            $scope.total = total();
                        });
                    });
                }
            };
		}]);
})();