const request = require('request');
const mysql = require('mysql');
module.exports = {


  /**
  Return random image URLs from an API
  string keyword- search term
  @param init image count- number of random images
  @return array of image URLs
  */

  getRandomImages_cb: function(keyword, imageCount, callback) {
    let requestURL = "http://api.unsplash.com/photos/random/?query=" + keyword + "&count=" + imageCount + "&client_id=d0d95b47354ed3fb460a85aeaece5857f0c594eb6c5bcfe06383b663188d1f6b";

    request(requestURL, function(error, response, body) {

      if (!error) {
        // Extract URL(s)
        let parsedData = JSON.parse(body);
        let imageURLs = [];

        for (let i = 0; i < imageCount; i++) {
          imageURLs.push(parsedData[i].urls.regular);
        }
        callback(imageURLs);
      } else {
        console.log('error:', error);
      }
    });
  }, // function
  
  
  getRandomImagesPromise: function(keyword, imageCount) {
    let requestURL = "http://api.unsplash.com/photos/random/?query=" + keyword + "&count=" + imageCount + "&client_id=d0d95b47354ed3fb460a85aeaece5857f0c594eb6c5bcfe06383b663188d1f6b";

    return new Promise(function(resolve, reject) {
      request(requestURL, function(error, reponse, body) {

        if (!error) {
          let parsedData = JSON.parse(body);
          let imageURLs = [];

          for (let i = 0; i < imageCount; i++) {
            imageURLs.push(parsedData[i].urls.regular);
          }
          //let imageURL = parsedData.urls.regular;
          resolve(imageURLs);
        } else {
          console.log("results", {
            "error": error
          });
        }
      }); //promise
    });
  },

  /*
   * creates database conneciton
   * @return db connection
   */
//mysql://b9206aaf590f18:9d245c3e@us-cdbr-iron-east-02.cleardb.net/heroku_c203b41df50da1f?reconnect=true
  // Create a connection to the database server
  createConnection: function() {
    var conn = mysql.mysql.createPool({
      connectionLimit: 10,
      host: "us-cdbr-iron-east-02.cleardb.net",
      user: "b9206aaf590f18",
      password: "9d245c3e",
      database: "heroku_c203b41df50da1f"
    });
    return conn;
  }
  
  //old connection below
/*
  createConnection: function() {
    var conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "img_gallery"
    });
    return conn;
  }
*/
  
  
} // exports ending