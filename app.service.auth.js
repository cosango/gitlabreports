(function () {
    'use strict';

    function main() {

        return {
            getAccessToken: function () {
                return localStorage.getItem('access_token');
            },
            redirectToOauth: function () {
                var client_id = 'f2a8860f24b57b1359af88f83b925ceef95f47a139b42e3abd08f87fe8b97830';
                var redirect_uri = encodeURI('http://gitlabreports.cosango.com/callback.html');
                var authorize_url = "https://gitlab.com/oauth/authorize?&client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=api&response_type=token&state=1";
                location.href = authorize_url;
            }

        };
    }

    angular.module('GitLabReportApp').service('auth', main);

})();

