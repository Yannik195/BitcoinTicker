//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/" , (req, res) => {

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }

  request(options, (error, response, body) => {
    console.log(body);

    var obj = JSON.parse(body);
    var price = obj.price;

    res.write("<h1> HELOOOOO </h1>")
    res.write("Price is: " + price);
    res.send();
  });
});



app.listen(3000, () => {
  console.log("Server Running");
});
