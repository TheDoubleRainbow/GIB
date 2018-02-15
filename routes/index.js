var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db = {url: "mongodb://gib:qwerty@ds245805.mlab.com:45805/heroku_dt4zfk5h"}

var ClientID = "f343de2cdd05ffd0d470"
var ClientSecret = "4d1c007bda1debdbd5684f9d0e0074a70f3eff9b"

/* GET home page. */
router.get('/', function(req, res, next) {
		console.log("SID" + req.sessionID);
	if (!req.session.userData) {

		req.session.userData = {};

	  	req.session.userData.code = "";
	   	req.session.userData.token = "";
	   	req.session.userData.authorized = false;
	   	req.session.userData.login = "";
	   	req.session.userData.avatar = "";
	   	req.session.userData.url = "";
	   }

  	if(req.param('code')){
	  	fetch(`http://github.com/login/oauth/access_token?client_id=${ClientID}&client_secret=${ClientSecret}&code=${req.param('code')}&accept=json`)
	  			    .then(function(response) {
        				return response.buffer();
    				}).then(function(buffer) {
        				var token = buffer.toString().split("&")[0].split("=")[1];
        				if(token != "bad_verification_code"){
        					req.session.userData.code = req.param('code');
	   			 			req.session.userData.token = token;
	   			 			req.session.userData.authorized = true;
	   			 			console.log("authorized");
	   			 				fetch(`http://api.github.com/user?access_token=${token}`)
	   			 				.then(function(response) {
    								response.json().then(function(data) {
    									console.log("Login");
      									req.session.userData.login = data.login;
      									req.session.userData.avatar = data.avatar_url;
      									req.session.userData.url = data.url;
      									req.session.save(function(err) {
										});
										res.redirect('/');
    								});
  								});
	
        				}
    				});
  	} else {
  		//res.render('index', {data: {token: req.session.token, auth: req.session.authorized}});
  		res.render('index', {data: req.session.userData});
  	}
});
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
     		"text": req.body.text,
     		"avatar": req.body.avatar
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
