'use strict';

class Geolocation {

    constructor(lat, lon) {
        this.current = {
            lat: Number(lat || 0).toFixed(2),
            lon: Number(lon || 0).toFixed(2),
        }
        this.antipode = {
            lat: -lat,
            lon: lon > 0 ? lon - 180 : lon + 180
        }
    }
}

module.exports = Geolocation;