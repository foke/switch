angular.module('switchApp').service('featureFlagService', function ($http, $q) {

    // Return public API.
    return({
        fetchFlags: fetchFlags
    });


    // ---
    // PUBLIC METHODS.
    // ---

    function fetchFlags (name) {            
        var request = $http.get('data/flags.json');
        return( request.then( handleSuccess, handleError ) );
    }

    // ---
    // PRIVATE METHODS.
    // ---

    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError (response) {
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
    function handleSuccess (response) {

        return( response.data );

    }
});