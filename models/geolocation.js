'use strict';

class Geolocation {

    constructor(lat, lon) {
        var _lat = Number(lat || 0),
            _lon = Number(lon || 0);

        this.current = {
            lat: _lat,
            lon: _lon,
        }
        this.antipode = {
            lat: -_lat,
            lon: _lon > 0 ? _lon - 180 : _lon + 180
        }
    }
}

module.exports = Geolocation;