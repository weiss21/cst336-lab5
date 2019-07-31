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

app.get("/api/updateFavorites", function(req, res){
  
  var conn = tools.createConnection();
  var sql;
  var sqlParams = [];
  
  if (req.query.action == "add") {
        sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
        sqlParams = [req.query.imageURL, req.query.keyword];
    } else {
        sql = "DELETE FROM favorites WHERE imageURL = ?"
        sqlParams = [req.query.imageURL];
    }
  
    conn.query(sql, sqlParams,  function(err, result){
        if(err) throw err;
  }); //connect
  
  res.send("It Works!");
});//update favorites

app.get("/displayKeywords", async function(req, res) {
  var imageURLs = await tools.getRandomImagesPromise("", 1);
  var conn = tools.createConnection();
  var sql = "SELECT DISTINCT keyword FROM `favorites` ORDER BY keyword";

    conn.query(sql, function(err, result){
      if (err) throw err;
      res.render("favorites", {"rows": result, "imageURLs": imageURLs});
      console.log(result);
    }); // query
}); //display Keywords

app.get("/api/displayFavorites", function(req, res) {
  var conn = tools.createConnection();
  var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
  var sqlParams = [req.query.keyword];

    conn.query(sql, sqlParams, function(err, result) {

      if (err) throw err;
      res.send(result);
    });//query


}); // displayFavorites

// Heroku update server listener
app.listen(port, serial, function() {
  console.log("Express Server is Running. . . ")
});

//background image load
//route route
app.get("/", async function(req, res) {
  let imageURLs = await tools.getRandomImagesPromise("", 1);
  res.render("index", {"imageURLs": imageURLs});
}); //route




app.get("/search", async function(req, res) {
  let keyword = req.query.keyword;
  
  let imageURLs = await tools.getRandomImagesPromise(keyword, 9);
  console.log("imageURLs for Promises: " + imageURLs);
  res.render("results", {"imageURLs": imageURLs, "keyword": keyword});

}); // search

