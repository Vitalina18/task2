const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT=process.env.PORT||3000;
const handlebars = require('express-handlebars').create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  

app.use(express.static(__dirname + "/public"));
 
//const vit=[];
const mongoose = require('mongoose'); 

mongoose.connect("mongodb//localhost:27017/vitalina"); // Insert your URI here 
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() { 
}); 
const userSchema = mongoose.Schema({ 
  name: String 
}); 
const Vit = mongoose.model('Vit', userSchema); 


app.get('/', function(req, res) {
	res.render('home');
});
app.get('/vit', function(req, res) {
	//res.render('vit', {vit : vit}); 
	Vit.find(function (err, Vit) { 
	    if (err) return console.error(err); 
		 res.render('Vit', {Vit : Vit}); 	
});

app.post("/vvv",urlencodedParser, function (request, response) {
let name= request.body.name;
let Lname= request.body.Lname;
//if (vit.includes(name)) { 
//	  response.render('error', {add : true, name : name}); 
//	    } else {    
//		 vit.push(`${name}  ${Lname}`); 
//	  response.render('vit', {vit : vit}); 
//	 } 
Vit.find({name : name}, function (err, users) { 
        if (err) return console.error(err); 
	          if (users.length) { 
	            res.render('errUser', {add : true, name : name});             
	         } else { 
	           newVit = new Vit({name : name}); 
	            newVit.save(function (err){ 
	            if (err) return console.error(err); 
				Vit.find(function (err, Vit) { 
	             if (err) return console.error(err); 
               res.render('Vit', {Vit : Vit}); 
            }) 
           }) 
	       } 
	 });
app.listen(PORT);