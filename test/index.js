const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

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

    it('it should GET New York', (done) => {
        chai.request(server)
            .get('/api/current?lat=40.7306&lon=-73.9867')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('location').eql('New York');
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

    it('it should GET Río Negro', (done) => {
        chai.request(server)
            .get('/api/antipode?lat=40.7306&lon=-73.9867')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('location').eql('Río Negro');
                done();
            });
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