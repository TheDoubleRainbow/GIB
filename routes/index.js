var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db = {url: "mongodb://gib:qwerty@ds245805.mlab.com:45805/heroku_dt4zfk5h"}

var ClientID = "f343de2cdd05ffd0d470"
var ClientSecret = "73bce73daf27ff16886af0b3ad64c51d0038345f"

/* GET home page. */
router.get('/', function(req, res, next) {
		console.log("SID" + req.sessionID);
	if (!req.session.token) {
		
	  	req.session.code = "";
	   	req.session.token = "";
	   	req.session.authorized = false;
	   }

  	if(req.param('code')){
	  	//bad_verification_code
	  	var authorized = false;
	  	fetch(`http://github.com/login/oauth/access_token?client_id=${ClientID}&client_secret=${ClientSecret}&code=${req.param('code')}&accept=json`)
	  			    .then(function(response) {
        				return response.buffer();
    				}).then(function(buffer) {
        				var token = buffer.toString().split("&")[0].split("=")[1];
        				if(token != "bad_verification_code"){
        					authorized = true;
        					console.log("GetTOken" + token);
        					req.session.code = req.param('code');
	   			 			req.session.token = token;
	   			 			req.session.authorized = authorized;
	   			 			req.session.save(function(err) {
  								// session saved
							});
	   			 			//res.send(token);
	   			 			res.redirect('/');
	   			 			//next();

        				}
        				//res.send(token);

    				});
  	} else {
  		//res.render('index', {data: {access_token: req.session.token, auth: req.session.authorized}});
  		res.render('index', {data: {token: req.session.token, auth: req.session.authorized}});
  		//next();
  	}
});

//router.get('/auth/github/callback', function(req, res, next) {
		
//});

router.get('/getReviews/:owner/:repo', function(req, res, next) {
	MongoClient.connect(db.url, (err, db) => {
		if (err) return console.log(err)
		db.collection('review', function (err, collection) {
        	collection.find({repo: req.params.owner+"/"+req.params.repo}).toArray(function(err, items) {
            	if(err) throw err;  
            	res.send(items)           
        	});
        
    	});         
	})
});

router.post('/addReview', function(req, res, next) {
	MongoClient.connect(db.url, (err, db) => {
		if (err) return console.log(err)
		db.collection('review').insertOne( {
     		"repo": req.body.repo,
     		"user": req.body.user,
     		"text": req.body.text
   		}, function(err, result) {
    		console.log("New review added: " + req.body.user + ": " + req.body.text + " to repo: " + req.body.repo);
			if(err){
				res.send(err)
			}
			else{
				res.send("ok")
			}
  		});        
		})
});

module.exports = router;
