const API_KEY = 'AIzaSyDF9UJAqDnXOqJ0ewSn9JI0Tj4gj5KCoig'

// Google map client
const googleMapsClient = require('@google/maps').createClient({
    key: API_KEY,
    Promise: require('q').Promise
});

export class GoogleMapClient {

    static findByAddress = (address) => {
        // Geocode an address.
        const promise = googleMapsClient.geocode({
            address: address
        }).asPromise();

        return promise.then((response) => {
            const results = response.json.results;

            const locationResults = results.map(result => {
                return {
                    address: result.formatted_address,
                    location: {
                        lat: result.geometry.location.lat,
                        lng: result.geometry.location.lng
                    }
                }
            });
            return locationResults;
        });
    }
}
