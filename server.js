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
        console.log('req.session.user:', req.session.user);
        if (req.session.user || req.url.includes('/panel') || req.url == '/test') {
            console.log('Authenticated request');
            next();
        } else {
            console.log('Request not authenticated, back to login page');
            //this isn't working
            res.status(403).json({'message': 'Nah'});;
        }
    });



app.get('/logout', function(req, res){
        req.session.destroy(function(err){
                if(err){
                    console.log('Error, session not destroyed');
                    console.log(err);
                    res.send(err);
                } else {
                    res.status(200).send('logged out');
                    console.log('Session destroyed');
                }
            });
});


app.get('/test', function(req, res){
        console.log('testing here...');
        console.log('req.session.user:', req.session.user);
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
            console.log('Error authenticating user');
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
                                 console.log('token');
                                 console.log(JSON.parse(body).access_token);
                                 req.session.user = {};
                                 req.session.user.token = JSON.parse(body).access_token;
                                 req.session.save();
                                 res.redirect('/#/play');
                             }
                             else{
                                 console.log(response);
                                 console.log(body);
                                 res.redirect('/#/login');
                             }
                         }
                         
                         );
        }
    });

var port = process.env.PORT || 80;
app.listen(port, function(){
        console.log('app listening on port ' + port);
    });
