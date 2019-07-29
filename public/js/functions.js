$(document).ready(function() {
  $(".favoriteIcon").on("click", function() {

    var imageURL = $(this).prev().attr("src");
    if ($(this).attr("src") == "img/favorite.png") {
      $(this).attr("src", "img/favorite_on.png");
      updateFavorite("add", imageURL); //inserts record
    } else {
      $(this).attr("src", "img/favorite.png");
      updateFavorite("delete", imageURL); //deletes record
    }
  })

  $(".keywordLink").on("click", function() {

  $.ajax({
    method: "get",
    url: "/api/displayFavorites",
    data: {
      "keyword": $(this).text().trim(),
    },
    success: function(rows, status) {
      $("#favorites").html("");
      rows.forEach(function(row) {
        //if (i % 4 == 0) {
       //   $("#favorites").append("<br />");
       // } else {
      //    $("#favorites").append("");
        //}
        //$("#favorites").append(row.imageURL+"<br>");
        $("#favorites").append("<img src='" + row.imageURL + "' width='200' height='200'>");
        //$("#favorites").append("<img src='/img/favorite_on.png' class='favoriteIconResults' width='20'>")
      })
    }
  }) //ajax
}); // displayKeywords
  
  
  
  function updateFavorite(action, imageURL) {
    $.ajax({
      method: "get",
      url: "/api/updateFavorites",
      data: {
        "imageURL": imageURL,
        "keyword": $("#keyword").val(),
        "action": action
      }
    }) //ajax
  }



}) //ready document