const express = require("express");
const bodyParser = require("body-parser");
//var mas = require('./lib/mas.js');
const app = express();
const PORT=process.env.PORT||3000;
const handlebars = require('express-handlebars').create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  
//app.use(express.bodyParser());
app.use(express.static(__dirname + "/public"));
 
const vit=[];

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/vit', function(req, res) {
	res.render('vit', {vit : vit}); 
	});

app.post("/vvv",urlencodedParser, function (request, response) {
let name= request.body.name;
let Lname= request.body.Lname;
if (vit.includes(name)) { 
	  response.render('error', {add : true, name : name}); 
	    } else {    
		 vit.push(`${name}  ${Lname}`); 
	  response.render('vit', {vit : vit}); 
	 } 
	 });
app.listen(PORT);