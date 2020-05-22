const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // setting up the handlebar for dynamic pages templates
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
  // view, callback
  res.render('index', {
    title: 'Weather App',
    name: "Tianyu"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: "Tianyu"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Tianyu',
    message: "I'm always willing to help."
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'The location is invalid.'
    })
  }

  // provide a default empty object, so that if an error occurs, we will not destruct "undefined"
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error Help 404',
    name: 'Tianyu',
    errMsg: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Tianyu',
    errMsg: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log('Server is up on ' + port)
})
