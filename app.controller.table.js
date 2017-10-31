(function () {
    'use strict';

    function main($rootScope, $scope, gitlab, auth) {

        $rootScope.$on('local-storage-updated', function () {
            $scope.comulative_time_spent = 0;
            $scope.comulative_time_estimate = 0;
            $scope.loadIssues();
        });

        $scope.loadIssues = function () {
            var params = {};
            if (localStorage.getItem('access_token')) {
                params.access_token = localStorage.getItem('access_token');
            } else {
                return;
            }
            if (localStorage.getItem('project_id')) {
                params.id = localStorage.getItem('project_id');
            } else {
                return;
            }
            if (localStorage.getItem('state')) {
                params.state = localStorage.getItem('state');
            }
            if (localStorage.getItem('milestone')) {
                params.milestone = localStorage.getItem('milestone');
            }
            if (localStorage.getItem('labels')) {
                params.labels = localStorage.getItem('labels');
            }
            $scope.issues = gitlab.projects_issues.query(
                params,
                function () {
                },
                function () {
                    auth.redirectToOauth();
                }
            );
        };

        $scope.getIssuesTimeStats = function (issue_project_id, issue_iid) {
            var stats = gitlab.issues_time_stats.get(
                {
                    access_token: localStorage.getItem('access_token'),
                    id: issue_project_id,
                    issue_iid: issue_iid
                },
                function () {
                    $scope.comulative_time_estimate += stats.time_estimate;
                    $scope.comulative_time_spent += stats.total_time_spent;
                    console.log($scope.comulative_time_estimate, $scope.comulative_time_spent);
                }
            );

            return stats;
        };

    }
	
	

    angular.module('GitLabReportApp').controller('TableController', main);

})();

