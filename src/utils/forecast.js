const request = require('request')

const forecast = (long, lat) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.darksky.net/forecast/ff7bbf67ce777045d46981cbda41b4d9/' + long + ',' + lat + '?units=si'
        request({url, json: true}, (error, { body }) => {
            if (error) {
                reject('Unable to connect to the weather service!')
            } else if (!body || !body.daily || body.error) {
                reject('Unable to find tocation')
            } else {
                resolve(body.daily.data[0].summary +
                    `It's currently ${body.currently.temperature} degrees out. 
                There is a ${body.currently.precipProbability} % chance of rain`)
            }
        })
    })
}


module.exports = forecast