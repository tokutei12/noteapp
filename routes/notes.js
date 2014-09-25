var express = require('express');
var router = express.Router();

/*GET notes*/
router.get('/', function(req, res) {
	res.render('notes/info', {title: 'My Note Homepage'});
});

router.get('/all', function(req, res) {
	var db = req.db;
	var collection = db.get('notescollection');
	collection.find({},{},function(e, docs){
		res.render('notes/collection', {
			'title': "My Notes",
			'notes': docs
		});
	});
});

router.get('/newnote', function(req, res) {
	res.render('notes/addnote', {title: 'Add a New Note'});
});

router.post('/addnote', function(req, res) {
	var db = req.db;

	//get the note information from the post body
	var title = req.body.title;
	var content = req.body.content;

	//get our db collection again
	var collection = db.get('notescollection');

	collection.insert({
		'title': title,
		'content': content
	},function(err, doc){
		if(err){
			res.send('An error occurred while adding this information to the database');
		}
		else{
			//set header to change address bar to the correct url location
			res.location('/notes/all');
			//redirect the user
			res.redirect('/notes/all');
		}
	})
});

module.exports = router;