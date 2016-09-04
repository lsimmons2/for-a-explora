var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');


app.use(cookieParser());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
            secret: 'xxxx',
                resave: false,
                saveUninitialized: true
}));


app.use(function(req, res, next) {
        console.log(req.method, req.url);
        console.log('req.session.user:', req.session.user, '\n');
        //need to remove favicon.ico exception below
        if (req.session.user || req.url.includes('/panel') || req.url == '/test' || req.url == '/loggedIn' || req.url == '/favicon.ico') {
            console.log('Authenticated request\n');
            next();
        } else {
            console.log('Request not authenticated, API call rejected\n');
            //this isn't working
            res.status(403).json({'message': 'Nah'});;
        }
    });

app.get('/loggedIn', function(req, res){
  if(req.session.user){
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
});

app.get('/test', function(req, res){
        console.log('testing here...\n');
        //console.log('req.session.user:', req.session.user);
        if(req.session.user){
            //var signedin = true;
            res.status(200).send('logged in')
        } else {
            //var signedin = false;
            res.status(200).send('not logged in');
        }
        //res.status(200).json({'message':'tested','signedin?':signedin});
    });


app.get('/panel', function(req, res){
  //redirects here b/c req is coming from Insta API
  if(req.query.error){
    console.log('Error authenticating user\n');
    res.redirect('/#/login');
  }
  else{
    request.post(
      'https://api.instagram.com/oauth/access_token',
      {form:{
        client_id: 'xxxx',
        client_secret: 'xxxx',
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost/panel',
        code: req.query.code
      }},
      function(error, response, body){
        if(!error && response.statusCode == 200){
          console.log('Success making POST to Insta API for token, making new session object');
          console.log('token:', (JSON.parse(body).access_token), '\n');
          req.session.user = {};
          req.session.user.token = JSON.parse(body).access_token;
          req.session.save();
          res.redirect('/#/home');
        }
        else{
          //console.log(response);
          //console.log(body);
          console.log(error);
          res.redirect('/#/home');
        }
      }
    );
  }
});


app.get('/logout', function(req, res){
        req.session.destroy(function(err){
                if(err){
                    console.log('Error, session not destroyed');
                    console.log('err:', err, '\n');
                    res.send(err);
                } else {
                    res.status(200).send('logged out');
                    console.log('Session destroyed\n');
                }
            });
});


app.get('/follows', function(req, res){
  var endpoint = 'https://api.instagram.com/v1/users/self/follows?access_token=' + req.session.user.token;
  request.get(endpoint, function(err, response, body){
    if(response.statusCode == 200 && !err){
      console.log('body.data[0].username:', JSON.parse(body).data[0].username);
      //var follows = JSON.parse(body).data;
      res.send(JSON.parse(body).data);
    } else{
        console.log('errorrrrr', err, '\n');
        res.send(err);
    }
  });
});


app.get('/ownPix', function(req, res){
  var endpoint = 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + req.session.user.token;
  request.get(endpoint, function(err, response, body){
          if(!err && response.statusCode == 200){
              res.send(JSON.parse(body).data);
              //var imgLinks = JSON.parse(body).data;
          } else{
              console.log('Error calling Insta API');
              //console.log('err', err);
              console.log('response.statusCode', response.statusCode, '\n');
              //console.log('body', body);
    }
  })
});


var port = process.env.PORT || 80;
app.listen(port, function(){
    console.log('\n====== app listening on port ' + port + ' ======\n');
    });
