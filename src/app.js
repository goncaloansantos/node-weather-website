const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res)=>{
    res.render('index', {
        title:"Weather",
        name:'Gonçalo'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:"About me",
        name:'Gonçalo'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:"HELP ME",
        helpText:'HELP who? - Gonçalo',
        name:"Gonçalo"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }
    const place = req.query.address
    geocode(place, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {description} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast:description,
                addressProvided: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.x)
    res.send({
        products:[],
    })
})

app.get('/help/*',(req, res)=>{
    res.render(('404'),{
        title:'404 help',
        error: 'Help article not found',
        name: 'Gonçalo'
    })
})

app.get('*',(req,res)=>{
    res.render(('404'),{
        title:'404',
        error: "404 not found",
        name: 'Gonçalo'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})