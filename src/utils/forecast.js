const request = require('postman-request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=730225b414337a7839732a37b8fb10e7&query='+lat+','+ long+'77.6035'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect services',undefined)
        } else if(body.error){
            callback('ubable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+'.The humidity is '+body.current.humidity+' %.It is currently '+body.current.temperature+' degree. it feels like '+body.current.feelslike+' degree out')
        }   
    })
}

module.exports = forecast
