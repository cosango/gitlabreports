(function () {
    'use strict';

    function main($scope, auth) {

        $scope.$watch('authRequired', function () {
            window.addEventListener('load', function () {
                setTimeout(function () {
                    if ($scope.authRequired) {
                        auth.redirectToOauth();
                    } else {
                        $("#loader").fadeOut("slow");
                    }
                }, 2000);
            });
        });

        $scope.authRequired = localStorage.getItem('access_token') === null;


    }

    angular.module('GitLabReportApp').controller('SplashController', main);

})();

