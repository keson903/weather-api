'use strict';

class Weather {

    constructor(date, loc, temp, desc, icon) {
        this.last_update = this.convertUnixToDate(date);
        this.now = new Date();
        this.location = loc;
        this.temperature = this.convertKelvinToCelsius(temp || -99);
        this.description = desc || 'Unavailable';
        this.icon = icon || 'unavailable';
    }

    convertKelvinToCelsius(temp) {
        temp = Number(temp || 0);
        return Math.round(temp - 273.15);
    }
    
    convertUnixToDate(unix) {
        return new Date(unix * 1000);
    }
}

module.exports = Weather;