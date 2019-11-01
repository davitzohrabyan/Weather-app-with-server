const request = require('request')

const geocode = (address) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiem9ocmFieWFuZGF2IiwiYSI6ImNrMmJpNmFsazJ1NW4zbG16dWh2YTFqMHkifQ.Y53oIkEdNTNO7-41kLpvdg&limit=10'
        request({url, json: true}, (error, { body }) => {
            if (error) {
                reject('Unable to connect to location services!')
            } else if (!body || !body.features || body.features.length === 0) {
                reject('Unable to find location. Try another search')
            } else {
                // console.log('geocode resolved')
                resolve({
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })
            }
        })
    })
}

module.exports = geocode