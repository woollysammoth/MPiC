var express = require('express'),
	_ = require("underscore"),
	bodyParser     = require('body-parser'),
	methodOverride = require('method-override'),
	exphbs  = require('express-handlebars'),
	PythonShell = require('python-shell');

var e = express(),
	router = express.Router(),
	hbs = exphbs.create({
		defaultLayout: 'app'
	});

var routes = require("./routes");

e.use("/css", express.static(__dirname + '/public/css'));
e.use("/img", express.static(__dirname + '/public/img'));
e.use("/js", express.static(__dirname + '/public/js'));
e.use("/fonts", express.static(__dirname + '/public/fonts'));
e.use("/build", express.static(__dirname + '/build'));
e.use("/public", express.static(__dirname + '/public'));
e.use(express.static(__dirname + '/public'));

e.use(bodyParser.urlencoded({ extended: false }));
e.use(bodyParser.json());
e.use(methodOverride());

e.engine('handlebars', hbs.engine);
e.set('view engine', 'handlebars');


e.route("/sample").post(routes.createSample);

e.route("/sets").get(routes.getSets);
e.route("/sets").post(routes.createSet);

e.route("/preset/increase").get(routes.increasePreset);
e.route("/preset/decrease").get(routes.decreasePreset);

e.route("/*").get(function(req, res){
	res.render("app");
});

e.use(router);

GLOBAL.sbpy = new PythonShell('samplerbox.py', {scriptPath: '/home/pi/SamplerBox/'});

e.listen(3000, function() {
	console.log('MPiC | %s:%d', e.settings.env, 3000);
});