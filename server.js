var express = require('express'),
	_ = require("underscore"),
	bodyParser     = require('body-parser'),
	methodOverride = require('method-override'),
	exphbs  = require('express-handlebars');

var e = express(),
	router = express.Router(),
	hbs = exphbs.create({
		defaultLayout: 'app'
	});

var routes = {};

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

// e.route("/api/login").post(misc.login);
// e.route("/api/logout").get(misc.logout);
// e.route("/api/join").post(misc.signup);

e.route("/*").get(function(req, res){
	res.render("app");
});

e.use(router);

e.listen(3000, function() {
	console.log('MPiC | %s:%d', e.settings.env, 3000);
});