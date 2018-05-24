'use strict';

const express = require("express");
const request = require("request");
const Weather = require("./models/weather");
const Geolocation = require("./models/geolocation");
const HttpResponse = require("./models/response");
// const cors = require('cors')

const app = express();
// app.use(cors());

// ping me to get the api key  - keson.tan@gmail.com
const apiKey = '####################';

// 
app.get('/api/current', (req, response) => {
    callback(req, response);
});
app.get('/api/antipode', (req, response) => {
    callback(req, response, true);
});

function callback(req, response, antipode = false) {
    var http = new HttpResponse(response);

    let lat = req.query.lat;
    let lon = req.query.lon;

    if (lat === undefined) {
        return http.BadRequest("lat is required");
    }

    if (lon === undefined) {
        return http.BadRequest("lon is required");
    }

    const geoLocation = new Geolocation(lat, lon);

    const geo = antipode ? geoLocation.antipode : geoLocation.current;
    const url = `http://api.openweathermap.org/data/2.5/find?lat=${geo.lat}&lon=${geo.lon}&cnt=1&appid=${apiKey}`;

    request(url, {}, (err, apiRes, weatherRes) => {
        if (err) {
            return http.InternalServerError("API is unavailable");
        }

        weatherRes = JSON.parse(weatherRes);

        if (weatherRes.cod !== '200' || weatherRes.list.length === 0) {
            return http.InternalServerError("Invalid lat or lon");
        }

        const nearby = weatherRes.list[0];
        nearby.main = nearby.main || {};
        nearby.weather = nearby.weather || [];

        const weather = nearby.weather[0] || {};

        return http.Ok(new Weather(nearby.dt, nearby.name, nearby.main.temp, weather.main, weather.icon));
    })
}

module.exports = app;