const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3c0fa7d824c6b8c407162543d7752eaa&query=' + latitude + ','+longitude + '&units=m'
    console.log(url)
    request(url, { json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const description = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsLikeTemperature = body.current.feelslike
            callback(undefined, {
                description,
                temperature,
                feelsLikeTemperature
            })
        }
    })
}

module.exports = forecast