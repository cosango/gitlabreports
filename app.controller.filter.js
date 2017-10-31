(function () {
    'use strict';

    function main($rootScope, $scope, $mdSidenav, gitlab, auth) {

        $scope.$watch('project', function () {
            $scope.labels = null;
            $scope.milestone = null;
            $scope.state = null;
            localStorage.removeItem('labels');
            localStorage.removeItem('milestone');
            localStorage.removeItem('state');

            if ($scope.project) {
                $scope.loadProjectLabels();
                $scope.loadProjectMilestones();
            }
        });

        $rootScope.$watch('show_comulative_time_estimate', function () {
            console.log($rootScope.show_comulative_time_estimate);
        });

        $scope.$watch('labels', function () {
            if ($scope.labels) {
            }
        });

        $scope.$watch('state', function () {
            if ($scope.state) {
            }
        });

        $scope.$watch('milestone', function () {
            if ($scope.milestone) {
            }
        });

        $scope.loadProjects = function () {
            $scope.projects = gitlab.projects.query({
                access_token: auth.getAccessToken(),
                membership: true
            });
        };

        $scope.loadProjectLabels = function () {
            if (!$scope.project) {
                return;
            }

            $scope.project_labels = gitlab.projects_labels.query({
                access_token: auth.getAccessToken(),
                id: $scope.project.id
            });
        };

        $scope.loadProjectMilestones = function () {
            if (!$scope.project) {
                return;
            }

            $scope.project_milestones = gitlab.projects_milestones.query({
                access_token: auth.getAccessToken(),
                id: $scope.project.id
            });
        };

        $scope.applyFilter = function () {
            if (!angular.isObject($scope.project)) {
                return;
            }

            localStorage.setItem('project_id', $scope.project.id);

            if ($scope.state) {
                localStorage.setItem('state', $scope.state);
            }
            if (angular.isObject($scope.milestone)) {
                localStorage.setItem('milestone', $scope.milestone.title);
            }
            if (angular.isObject($scope.labels)) {
                var l = [];
                angular.forEach($scope.labels, function (item) {
                    l.push(item.name);
                });
                localStorage.setItem('labels', l.join(','));
            }

            $rootScope.$broadcast('local-storage-updated');
        };

        $rootScope.show_comulative_time_estimate = true;
        $rootScope.show_comulative_time_spent = true;
        $rootScope.show_show_logo_print = true;
        $rootScope.table_columns = [
            'srno',
            'iid',
            'title',
            'created_at',
            'author',
            'assignee',
            'time_estimate',
            'total_time_spent'
        ];
        $scope.loadProjects();
    }

    angular.module('GitLabReportApp').controller('FilterController', main);

})();

