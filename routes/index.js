var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db = {url: "mongodb://gib:qwerty@ds245805.mlab.com:45805/heroku_dt4zfk5h"}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
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
