const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// const vit=[];
const mongoose = require("mongoose");

// // mongoose.connect("mongodb//localhost:27017/vitalina"); // Insert your URI here
mongoose.connect("mongodb://vitalina:18@ds127589.mlab.com:27589/vitalina"); // Insert your URI here
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {});
const userSchema = mongoose.Schema({
  name: String,
  Lname: String,
  born: Number,
  tel: Number,
  mail: String,
  dolg: String
});
const Vit = mongoose.model("Vit", userSchema);

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/vit", function(req, res) {
  //res.render('vit', {vit : vit});
  Vit.find(function(err, Vit) {
    if (err) return console.error(err);

    console.log(Vit);
    res.render("Vit", { Vit: Vit });
  });
});

app.post("/del", urlencodedParser, function(request, response) {
  let name = request.body.name;
  console.log(name);
  if (!name) {
    response.render("errUser", { empty: true });
  } else {
    Vit.remove({ name: { $in: name } }, function(err) {
      if (err) return console.error(err);
      Vit.find(function(err, Vit) {
        if (err) return console.error(err);
        response.render("Vit", { Vit: Vit });
      });
    });
  }
});

app.post("/vvv", urlencodedParser, function(request, response) {
  let name = request.body.name;
  console.log(name);
  let Lname = request.body.Lname;
  console.log(Lname);
  let Born = request.body.Born;
  console.log(Born);
  let Telephone = request.body.Telephone;
  console.log(Telephone);
  let mail = request.body.mail;
  console.log(mail);
  let Positions = request.body.Positions;
  console.log(Positions);

  Vit.find(
    {
      name: name
    },
    function(err, vit) {
      if (err) return console.error(err);
      if (vit.length) {
        response.render("errUser", {
          add: true,
          name: name
        });
      } else {
        newVit = new Vit({
          name: name,
          Lname: Lname,
          Born: Born,
          Telephone: Telephone,
          mail: mail,
          Positions: Positions
        });
        newVit.save(function(err) {
          if (err) return console.error(err);
          Vit.find(function(err, Vit) {
            if (err) return console.error(err);
            response.render("Vit", { Vit: Vit });
          });
        });
      }
    }
  );
});
app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
