angular
	.module('segmentoApp')
	.controller('indexController', ['$scope', ($scope) => {
		$scope.data = [
			{ id: 1, sum: 845.00, description: 'Прибыль' },
			{ id: 2, sum: 245.00, description: 'Прибыль' },
			{ id: 3, sum: 1345.00, description: 'Прибыль' },
			{ id: 4, sum: 815.00, description: 'Прибыль' },
			{ id: 5, sum: 85.00, description: 'Прибыль' },
			{ id: 6, sum: 8545.00, description: 'Прибыль' },
			{ id: 7, sum: 89.00, description: 'Прибыль' },
			{ id: 8, sum: 10845.00, description: 'Прибыль' }
		];

		// the entire amount
		function total() {
			let sum = 0;
			for (let i = 0; i < $scope.data.length; i++) {
				sum += $scope.data[i].sum;
			}

			return sum;
		}

		$scope.total = total();

		console.log($scope);
	}]);