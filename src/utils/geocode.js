const request = require('postman-request')

const apiKey = 'pk.eyJ1IjoidGluYXFpdHkiLCJhIjoiY2thZWRudGNuMmcwejJ5dWx2eTF5bTQ4aSJ9.FR_nJ449k1Tk0xUK_-noAg'
const baseUrl = 'https://api.mapbox.com'
const endpoint = 'mapbox.places'

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address)
  const geoUrl = `${baseUrl}/geocoding/v5/${endpoint}/${encodedAddress}.json?access_token=${apiKey}&limit=1`

  request(geoUrl, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the location service.', undefined)
      return
    }

    const bodyObj = JSON.parse(body)
    if (bodyObj.message) {
      callback(bodyObj.message, undefined)
      return
    }

    // features is an array
    if (bodyObj.features.length == 0) {
      callback('Empty result. Try another location.', undefined)
    } else {
      callback(undefined, {
        latitude: bodyObj.features[0].center[1],
        longitude: bodyObj.features[0].center[0],
        location: bodyObj.features[0].place_name
      })
    }
  })
}

module.exports = geocode
