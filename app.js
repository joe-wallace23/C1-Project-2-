//jshint esversion:6
// Start Using Environment Variables to Keep Secret Safe like API address in app.js
require('dotenv').config();
// End Using Environment Variables to Keep Secret Safe like API address in app.js

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("home")
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server has started Successfully")
});