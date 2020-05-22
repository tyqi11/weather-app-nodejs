const request = require('postman-request')

const apiKey = 'fdbb01932eaa8c2e095969373296e2dd'
const baseUrl = 'http://api.weatherstack.com'
const units = 'f'

const forecast = (lat, lon, callback) => {
  const weatherUrl = `${baseUrl}/current?access_key=${apiKey}&query=${lat},${lon}&units=${units}`

  request(weatherUrl, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather service.', undefined)
      return
    }

    const bodyObj = JSON.parse(body);
    if (bodyObj.error) {
      callback(bodyObject.error.info, undefined)
    } else {
      callback(undefined, `${bodyObj.current.weather_descriptions}. It is currently ${bodyObj.current.temperature} degrees. It feels like ${bodyObj.current.feelslike} degrees.`)
    }
  })
}

module.exports = forecast
