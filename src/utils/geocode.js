const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ29uY2Fsb2Fuc2FudG9zIiwiYSI6ImNtNHNrd3ZvMDAxeGkybHNhZmtwM2x0em0ifQ.5a3An0wZbbpcceUiYSDFsg&limit=1'
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if ( body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode