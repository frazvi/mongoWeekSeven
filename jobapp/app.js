// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Create Express App Object \\
var app = express();
mongoose.connect('mongodb://localhost/jobapp');

// Schema
var jobappSchema = mongoose.Schema({
	name							: String,
	bio								: String,
	skills							: Array,
	yearsOfExperience				: Number,
	reasonForWorkingHere			: String
});

var Applicant = mongoose.model('applicants', jobappSchema)

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\

app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'});
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.sendFile('html/applicants.html', {root : './public'});
});

// Get applicant list
app.get('/api/getApplicants', function(req, res){
	Applicant.find({}, function(err, docs){
		res.send(docs)
	})
})

// creates an applicant
app.post('/applicant', function(req, res){
	var jobPerson = new applicant (req.body);
	jobPerson.save()
	console.log(req.body)
	// Here is where you need to get the data
	// from the post body and store it in the database
	res.send('Success!');
});

// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})