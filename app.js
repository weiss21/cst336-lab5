const express = require("express"); //imports Express Library
const app = express(); //variable "app" to access methods.
const request = require("request"); //make sure request part works.
//app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs"); //From Sean's lab5 tutorial, cst 336 summer 2019.
app.use(express.static("public"));

const mysql = require("mysql");
const tools = require("./tool.js")

let port = process.env.PORT || "8081"; //To work in both local (codeanywhere) and heroku
let serial = process.env.IP || "0.0.0.0"; // same as comment above
//server listener original example
//app.listen("8081", "0.0.0.0", function(){
//  console.log("Express Server is Running...")
//})

// Heroku update server listener
app.listen(port, serial, function() {
  console.log("Express Server is Running. . . ")
});

//background image load
//route route
app.get("/", async function(req, res) {
  let imageURLs = await tools.getRandomImagesPromise("", 1);
  res.render("index", {"imageURL": imageURLs});
}); //route




app.get("/search", async function(req, res) {
  let keyword = req.query.keyword;
  
  let imageURLs = await tools.getRandomImagesPromise(keyword, 9);
  console.log("imageURLs for Promises: " + imageURLs);
  res.render("results", {"imageURLs": imageURLs, "keyword": keyword});

}); // search

