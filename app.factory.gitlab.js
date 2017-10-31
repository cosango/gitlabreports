(function () {
    'use strict';

    function main($resource) {

        return {
            issues: $resource(
                'https://gitlab.com/api/v4/issues',
                {},
                {
                    query: {
                        method: 'GET',
                        isArray: true
                    }
                }
            ),
            issues_time_stats: $resource(
                'https://gitlab.com/api/v4/projects/:id/issues/:issue_iid/time_stats',
                {},
                {
                    get: {
                        method: 'GET'
                    }
                }
            ),
            projects: $resource(
                'https://gitlab.com/api/v4/projects',
                {},
                {
                    query: {
                        method: 'GET',
                        isArray: true
                    }
                }
            ),
            projects_issues: $resource(
                'https://gitlab.com/api/v4/projects/:id/issues',
                {},
                {
                    query: {
                        method: 'GET',
                        isArray: true
                    }
                }
            ),
            projects_labels: $resource(
                'https://gitlab.com/api/v4/projects/:id/labels',
                {},
                {
                    query: {
                        method: 'GET',
                        isArray: true
                    }
                }
            ),
            projects_milestones: $resource(
                'https://gitlab.com/api/v4/projects/:id/milestones',
                {},
                {
                    query: {
                        method: 'GET',
                        isArray: true
                    }
                }
            )
        };
    }

    angular.module('GitLabReportApp').factory('gitlab', main);

})();

