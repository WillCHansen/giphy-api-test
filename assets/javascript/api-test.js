var topics = ["dog", "cat", "gecko", "lion", "tiger"];
renderButtons();


// when the add button is clicked...
$("#add_search").on("click", function() {
  // add the text from the input box to our topic array and then recreate buttons by running a function
  topics.push($("#add_input").val().trim());
  renderButtons();
});

function renderButtons() {

  $("#button_container").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var cur_butt = $("<button>");
    // Adding a data-attribute
    cur_butt.attr("data-topic", topics[i]);

    cur_butt.attr("class", "btn-lg btn-primary topic");
    // Providing the initial button text
    cur_butt.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#button_container").append(cur_butt);
  }

  $(".topic").on("click", function(){
      searchGiphy($(this).data("topic"));
  });

};

function searchGiphy(searchString) {
  $("#gif_container").empty();

  var queryObj = {
    q: searchString,
    limit: 10,
    rating: "g",
    fmt: "json",
    api_key: "dc6zaTOxFJmzC"
  };

  var URL = "https://api.giphy.com/v1/gifs/search?";
  var queryURL = URL + $.param(queryObj)
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    var results = response.data;

    console.log(results);

    for (var i = 0; i < results.length; i++) {

      var animalDiv = $("<div>");

      var p = $("<p>");

      p.text("Rated: "+results[i].rating);

      var animalImage = $("<img>");

      animalImage.attr("src", results[i].images.original_still.url);

      animalImage.attr("animated", 0);

      animalImage.attr("animatedSRC", results[i].images.fixed_height.url)

      animalImage.attr("nonAnimatedSRC", results[i].images.original_still.url)

      // results[i].images.fixed_height.url is moving

      // results[i].images.original_still.url is still      

      animalDiv.append(p);

      animalDiv.append(animalImage);

      animalDiv.attr("class", "imgcont");

      $("#gif_container").prepend(animalDiv);

    }

    $("img").on("click", function(){
      console.log("working");
      if ($(this).attr("animated") == 1){
        $(this).attr("src", $(this).attr("nonAnimatedSRC"));
        $(this).attr("animated", 0);
        console.log("not animated");
      }
      else{
        $(this).attr("src", $(this).attr("animatedSRC"));
        $(this).attr("animated", 1);
        console.log("animated");
      }
    });

  });
};