angular.module('switchApp').service('lampService', function ($http, $q) {
    // Return public API.
    return({
        switchLamp: switchLamp,
        fetchLamps: fetchLamps,
        deleteLamp: deleteLamp
    });


    // ---
    // PUBLIC METHODS.
    // ---

    function switchLamp (action, id) {
        var server = localStorage.getItem('server') || 'localhost:3000';
        var request = $http.jsonp('http://'+server+'/actions/'+action+'/'+id+'?callback=JSON_CALLBACK', {timeout: 2000});
        return( request.then( handleSuccess, handleError ) );
    }

    function fetchLamps () {
        var server = localStorage.getItem('server') || 'localhost:3000';            
        var request = $http.jsonp('http://'+server+'/actions/list/?callback=JSON_CALLBACK', {timeout: 2000});
        return( request.then( handleSuccess, handleError ) );   
    }

    function deleteLamp (id) {
        var server = localStorage.getItem('server') || 'localhost:3000';
        var request = $http.jsonp('http://'+server+'/actions/delete/'+id+'?callback=JSON_CALLBACK', {timeout: 2000});
        return( request.then( handleSuccess, handleError ) );
    }

    // ---
    // PRIVATE METHODS.
    // ---

    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError(response) {
        // display error message here!

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {

            return( $q.reject( 'An unknown error occurred.' ) );

        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );

    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {

        return( response.data );

    }
});