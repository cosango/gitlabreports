(function () {
    'use strict';

    function main($rootScope, $scope, $mdSidenav) {
        $scope.logout = function () {
            localStorage.removeItem('access_token');
            location.href = 'http://www.cosango.com/';
        };

    $scope.showMe = true;

        $scope.toggleRightSidenav = function () {
            console.log('$rootScope.right_sidenav_locked_open', $rootScope.right_sidenav_locked_open);
            $rootScope.right_sidenav_locked_open = !$rootScope.right_sidenav_locked_open;
            $scope.showMe = !$scope.showMe;
        };

        $rootScope.right_sidenav_locked_open = true
    }

    angular.module('GitLabReportApp').controller('ToolbarController', main);

})();

