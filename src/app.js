const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// defines path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup hbsengine and views location 
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Lalit Mittal'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About page',
        name:'lalit mitttal'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText:'Help page',
        title:'Help',
        name:'lalit mittal'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'you must provide the address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {    
        if(error){
            //return console.log(error)
            return    res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                //return console.log(error)
             return    res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData: forecastData
            })
        //    console.log(location)
        //    console.log(forecastData)
        })
    })
    // res.send({
    //     location:req.query.address,
    //     forecast:'50 degree'
    // })
})



app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'Help text Not found',
        name:'lalit mittal'
    })
})

app.get('*' , (req, res) => {
    res.render('404',{
        title:'Page Not found',
        name:'lalit mittal'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})