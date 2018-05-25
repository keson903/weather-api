const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;
const should = chai.should();
const Weather = require('../models/weather');
const Geolocation = require('../models/geolocation');

chai.use(chaiHttp);

describe('/GET api/current', () => {
    it('it should GET lat is required', (done) => {
        chai.request(server)
            .get('/api/current')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('lat is required');
                done();
            });
    });

    it('it should GET lon is required', (done) => {
        chai.request(server)
            .get('/api/current?lat=1')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('lon is required');
                done();
            });
    });


    it('it should GET Invalid lat or lon', (done) => {
        chai.request(server)
            .get('/api/current?lat=181&lon=181')
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Invalid lat or lon');
                done();
            });
    });


    it('it should BE now = Date, last_update = Date, temperature = Number', (done) => {
        chai.request(server)
            .get('/api/current?lat=2.9353&lon=101.6911')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(IsJsonString(res.body.now)).eql(true);
                expect(IsJsonString(res.body.last_update)).eql(true);
                res.body.temperature.should.be.a('number');
                done();
            });
    });

    it('it should GET Putrajaya', (done) => {
        chai.request(server)
            .get('/api/current?lat=2.9353&lon=101.6911')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('location').eql('Putrajaya');
                done();
            });
    });

    it('it should GET Christchurch', (done) => {
        chai.request(server)
            .get('/api/current?lat=-43.532054&lon=172.636225')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('location').eql('Christchurch');
                done();
            });
    });
});

describe('/GET api/antipode', () => {
    it('it should GET lat is required', (done) => {
        chai.request(server)
            .get('/api/antipode')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('lat is required');
                done();
            });
    });

    it('it should GET lon is required', (done) => {
        chai.request(server)
            .get('/api/antipode?lat=1')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('lon is required');
                done();
            });
    });


    it('it should GET Invalid lat or lon', (done) => {
        chai.request(server)
            .get('/api/antipode?lat=181&lon=181')
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Invalid lat or lon');
                done();
            });
    });

    it('it should BE now = Date, last_update = Date, temperature = Number', (done) => {
        chai.request(server)
            .get('/api/antipode?lat=2.9353&lon=101.6911')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(IsJsonString(res.body.now)).eql(true);
                expect(IsJsonString(res.body.last_update)).eql(true);
                res.body.temperature.should.be.a('number');
                done();
            });
    });

    it('it should GET Musmus', (done) => {
        chai.request(server)
            .get('/api/antipode?lat=2.9353&lon=101.6911')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('location').eql('Musmus');
                done();
            });
    });

    it('it should GET Foz', (done) => {
        chai.request(server)
        .get('/api/antipode?lat=-43.532054&lon=172.636225')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('location').eql('Foz');
                done();
            });
    });
});

describe('Weather model', () => {

    it('it should CONVERT unix time stamp to Date type', (done) => {
        var model1 = new Weather(1527228126);
        model1.last_update.should.be.a('date');

        var model2 = new Weather(1527228000);
        model2.last_update.should.be.a('date')

        done();
    });

    it('it should CONVERT 300Kelvin to 27Celsius, 260Kelvin to -13Celsius', (done) => {
        var model1 = new Weather(0, '', 300);
        expect(model1.temperature).eql(27);

        var model2 = new Weather(0, '', 260);
        expect(model2.temperature).eql(-13);

        done();
    });

    it('it should BE Unavailable when empty', (done) => {
        var model1 = new Weather(0, '', 300);
        expect(model1.description).eql('Unavailable');

        var model2 = new Weather(0, '', 260);
        expect(model2.icon).eql('unavailable');

        done();
    });
});

describe('Geolocation model', () => {

    it('it should BE current location', (done) => {
        var model1 = new Geolocation(40.7306, -73.9867).antipode;
        model1.should.have.property('lat').eql(-40.7306);
        model1.should.have.property('lon').eql(106.0133);


        var model2 = new Geolocation(-100.8, -75.9).current;
        model2.should.have.property('lat').eql(-100.8);
        model2.should.have.property('lon').eql(-75.9);

        done();
    });

    it('it should BE antipode', (done) => {
        var model1 = new Geolocation(80.888888, 100.222222).antipode;
        model1.should.have.property('lat').eql(-80.888888);
        model1.should.have.property('lon').eql(-79.777778);
        
        var model2 = new Geolocation(-100.8, -75.9).antipode;
        model2.should.have.property('lat').eql(100.8);
        model2.should.have.property('lon').eql(104.1);

        done();
    });
});

function IsJsonString(date) {
    try {
        JSON.parse(`{"date": "${date}"}`);
    } catch (e) {
        return false;
    }
    return true;
}