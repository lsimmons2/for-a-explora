var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server.js');
chai.use(chaiHttp);

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

//this should test a redirect but I don't think redirects are supported in chai - they are in supertester
/*describe('/panel', function(){
  it('should redirect to home', function(done){
    chai.request(server)
    .get('/panel')
    .end(function(err, res){

    })
  })
})*/
