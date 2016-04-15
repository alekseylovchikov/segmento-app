(() => {
	'use strict';

	angular
		.module('segmentoApp')
		.controller('indexController', ($scope, itemsFactory) => {
			// init default sort
			$scope.sortType = 'id';
		  $scope.sortReverse = false;

		  // load all items from databse
			$scope.data = itemsFactory.ref;

			$scope.data.$loaded().then(() => {
				// load sum to scope
				$scope.total = total();
			});

			function total() {
				let sum = 0;

				for (let i = 0; i < $scope.data.length; i++) {
					sum += $scope.data[i].sum;
				}

				return sum;
			}

			// show modal window for add new item
			$scope.showModal = () => {
				$scope.show = true;
			};

			// close modal
			$scope.closeModal = () => {
				$scope.show = false;
				setTimeout(() => {
					$scope.item = {};
					$scope.editing = false;
				}, 300);
			};

			// save new item to scope data
			$scope.saveNewItem = (item) => {
				if (item) {
					let idItem = $scope.data.length + 1;
					let newItem = {
						id: idItem,
						sum: parseFloat(item.sum),
						description: item.description
					};

					$scope.data.$add(newItem);
					// recheck total sum
					$scope.data.$loaded().then(() => {
						// load sum to scope
						$scope.total = total();
					});
					// close modal
					$scope.closeModal();
				}
			};
			
			$scope.editItem = (item) => {
				$scope.editing = true;
				$scope.showModal();
				$scope.item = $scope.data.$getRecord(item.$id);
			};

			$scope.saveEdit = (item) => {
				if (item) {
					item.sum = parseFloat(item.sum);

					$scope.data.$save(item).then(() => {
						$scope.closeModal();
						// recheck total sum
						$scope.data.$loaded().then(() => {
							// load sum to scope
							$scope.total = total();
						});
					});
				}
			};
		});
})();