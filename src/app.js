const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Zohrabyan Davit',
        // vasya: ['asxdjia', 'alesjcaskl', 'sdac']
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About weather app',
        name: 'Davit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helpful',
        title: 'Help section',
        name: 'Davit Zohrabyan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address).then((messages) => {
                const result = messages.map((message) => {
                    return  forecast(message.longitude, message.latitude)
                })
                Promise.all(result).then((m) => {
                    res.send({
                        forecast: m,
                        location: messages
                    })
                })
        }).catch((error) => {
            res.send(error)
        })
    }
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Davit',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Davit',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


