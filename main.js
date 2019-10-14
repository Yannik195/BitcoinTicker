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
  console.log(req.body.crypto);

  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + req.body.crypto + req.body.fiat, (e, res, body) =>{
    console.log("Body: " + body);
    console.log(body);
    var obj = JSON.parse(body);
    console.log(obj.last);
  });
});



app.listen(3000, () => {
  console.log("Server Running");
});
