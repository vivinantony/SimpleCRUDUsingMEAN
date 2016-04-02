var app = angular.module('app', []);
app.controller('AppCtrl', function($scope, $http) {
    function refresh() {
        $http.get('/api', $scope.user).success(function(data) {
            $scope.users = data;
        });
    }

    refresh();

    $scope.add = function() {
        $http.post('/api', $scope.user).success(function(data) {
            $scope.users = data;
            refresh();
        });
    };

    $scope.view = function(id) {
        $http.get('/api/' + id).success(function(data) {
            $scope.user = data;
        });
    };

    $scope.delete = function(id) {
        $http.delete('/api/' + id).success(function(data) {
            $scope.user = data;
            refresh();
        });
    };

    $scope.update = function() {
        $http.put('/api/' + $scope.user._id, $scope.user).success(function(data) {
            $scope.user = data;
            refresh();
        });
    };
});