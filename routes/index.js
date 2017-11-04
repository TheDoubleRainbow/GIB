var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db = {url: "mongodb://gib:qwerty@ds245805.mlab.com:45805/heroku_dt4zfk5h"}
/*MongoClient.connect(db.url, (err, db) => {
  if (err) return console.log(err)
  db.collection('review', function (err, collection) {
        
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);            
        });
        
    });         
})*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
