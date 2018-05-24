'use strict';

class HttpResponse {
    constructor(res) {
        this.BadRequest = (msg) => {
            return res.status(401).json({
                message: msg
            });
        }

        this.InternalServerError = (msg) => {
            return res.status(500).json({
                message: msg
            });
        }

        this.Ok = (json) => {
            return res.json(json);
        }
    }
}

module.exports = HttpResponse;