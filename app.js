var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	swig = require('swig');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/signup', function (req, res) {
	res.render('signup');
});

app.post('/signup', function (req, res, next) {
	console.log('body:', req.body);
	next();
});

app.get('/login', function (req, res) {
	res.render('login');
});

app.post('/login', function (req, res, next) {
	console.log('body:', req.body);
	next();
});

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	err.status = err.status || 500;
	console.log('error:', err);
	res.status(err.status).render('error', {error: err});
});

var port = 8080;
app.listen(port, function () {
	console.log('Express server listening intenly on port:', port)
});