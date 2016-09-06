var chai = require('chai');
//var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server.js');
chai.use(chaiHttp);

describe('test', function(){
  it('a equals a', function(done){
    expect('a').to.equal('a');
    done();
  });
  it('/test', function(done){
    chai.request(server)
    .get('/test')
    .field('session', '')
    .end(function(err, res){
      res.body.should.be.a('object');
      done();
    });
  });
});

describe('/loggedIn', function(){
  it('should send 200 status and boolean body', function(done){
    chai.request(server)
    .get('/loggedIn')
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.be.a('boolean');
      done();
    });
  });
});




/*describe('/ownPix', function(){
  it('response body should be array of 20', function(done){
    chai.request(server)
    .get('/ownPix')
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});*/

//this should test a redirect but I don't think redirects are supported in chai - they are in supertester
/*describe('/panel', function(){
  it('should redirect to home', function(done){
    chai.request(server)
    .get('/panel')
    .end(function(err, res){

    })
  })
})*/
