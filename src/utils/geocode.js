const request = require('request')

const geocode = (address) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiem9ocmFieWFuZGF2IiwiYSI6ImNrMmJpNmFsazJ1NW4zbG16dWh2YTFqMHkifQ.Y53oIkEdNTNO7-41kLpvdg&limit=5'
        request({url, json: true}, (error, { body }) => {
            if (error) {
                reject('Unable to connect to location services!')
            } else if (!body || !body.features || body.features.length === 0) {
                reject('Unable to find location. Try another search')
            } else {
                // console.log('geocode resolved')
                let arrResolve = []
                for(let i = 0; i < body.features.length; i++) {
                    arrResolve[i] = {
                        latitude: body.features[i].center[0],
                        longitude: body.features[i].center[1],
                        location: body.features[i].place_name
                    }
                }
                // console.log(arrResolve)
                resolve(arrResolve)
            }
        })
    })
}
// geocode('Yerevan')

module.exports = geocode