const request = require('request');

module.exports = {
  
  
/**
Return random imae URLs from an API
string keyword- search term
@param init image count- number of random images
@return array of image URLs
*/
  
  getRandomImages_cb: function (keyword, imageCount, callback) {
    let requestURL = "http://api.unsplash.com/photos/random/?query=" + keyword + "&count="+ imageCount +"&client_id=d0d95b47354ed3fb460a85aeaece5857f0c594eb6c5bcfe06383b663188d1f6b";
  
    request(requestURL, function (error, response, body) {

        if (!error) {
            // Extract URL(s)
            let parsedData = JSON.parse(body);
            let imageURLs = [];

            for (let i = 0; i < imageCount; i++) {
                imageURLs.push(parsedData[i].urls.regular);
            }
            callback(imageURLs);
        }
        else {
            console.log('error:', error);
        }
    });
}, // function
getRandomImagesPromise: function(keyword, imageCount) {
  let requestURL = "http://api.unsplash.com/photos/random/?query=" + keyword + "&count="+ imageCount +"&client_id=d0d95b47354ed3fb460a85aeaece5857f0c594eb6c5bcfe06383b663188d1f6b";
  
  return new Promise( function(resolve, reject) {
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
        console.log("error:", error)
      }
    });//promise
  });
}
  
  
  
  
  
  
}