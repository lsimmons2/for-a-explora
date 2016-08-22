var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var port = process.env.PORT || 80;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
    });


app.get('/panel', function(req, res){
	if(req.query.error){
	    console.log('Error authenticating user');
	    res.redirect('/error');
	}
	else{
	    request.post(
			 'https://api.instagram.com/oauth/access_token',
			 {form:{
				 client_id: '7953d7ce6a4e4a98bda5ccda117c6399',
				     client_secret: 'b2613dc4956b47fd9dfdf2d8f55b00a7',
				     grant_type: 'authorization_code',
				     redirect_uri: 'http://localhost/panel',
				     code: req.query.code
				     }},
			 function(error, response, body){
			     if(!error && response.statusCode == 200){
				 console.log('success');
				 console.log(body);
				 res.jsonp(body);
				 return;
			     }
			     else{
				 console.log(response);
				 console.log(body);
			     }
			 }
			 
			 );
	}
    });



app.listen(port, function(){
	console.log('app listening on port ' + port);
    });
