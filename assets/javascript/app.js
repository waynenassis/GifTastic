

var themes = ["messi", "Shaq", "Jordan", "Peyton Manning", "Kobi Bryant", "Tiger Woods", "Derek Jeter", "Babe Ruth", "Barry Bonds", "Steve Prefonataine", "Joe Green", "Larry Bird", "Ronaldo"];

var button;
var newTheme = ""; 

// function to create new buttons from the themes array
var buttonGenerator = function (){
	// the previous div elements are emptied 
	 $("#buttonArea").empty();
	// loops through the array and creates buttons
	for(i = 0; i < themes.length; i++) {
		button = $("<button type=" + "button" + ">" + themes[i] + "</button>").addClass("btn btn-warning").attr("data",themes[i]);
		$("#buttonArea").append(button);
	};
}

// The user clicks button makes gif appear
$("#buttonArea").on("click", ".btn", function(){
  		var key = $(this).attr("data");
  		var theUrl = "https://api.giphy.com/v1/gifs/search?q=" +key + "&api_key=dc6zaTOxFJmzC&limit=20";


  		$.ajax({
  			url: theUrl,
  			method: "GET" 

  		}).done(function(response){
  			console.log(response);
  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
          		// a div is created to hold a gif of any topic
	          	var createDiv = $("<div>");
	 			
	          	// Under every gif, display its rating (PG, G, so on).
	 			var p = $("<p>");
	 			p.text(results[i].rating);
	 			var p = $("<p>").text("Rating: " + results[i].rating);

	 			// add a CSS style to create colored borders around the gifs
	 			var gifImage = $("<img>");

	 			// add states of animate and still which will be toggled 
	 			gifImage.attr("src", results[i].images.fixed_height_still.url);
	 			gifImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			gifImage.attr("data-animate", results[i].images.fixed_height.url)
	 			gifImage.attr("data-state", "still")
	 			gifImage.addClass("gif");
	 			
	 			// image is appended to the div
	 			createDiv.append(gifImage);
	 			// rating is appended to the div below the gif
	 			createDiv.append(p); 			
	 			// new images will be placed at the beginning (top) of the containing gif area
	 			$("#gifZone").prepend(createDiv);
 			}
  		})
  })

// When the user clicks on gif it stops clcik to start again
$("#gifZone").on("click", ".gif", function(event){
	event.preventDefault();
	
	// current state of the clicked gif 
	var state = $(this).attr("data-state");
	
	// current state gifs toggle between animate and still 
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})
   
// The form takes the value from the input box and adds it into the themes  array. The buttonGenerator function is called that takes each topic in the array remakes the buttons on the page.

$(".submit").on("click", function(event){
	event.preventDefault();

	// sets inputted value to newTheme 
	newTheme = $("#topic-input").val();
	// new topic is added to the themes array 
	themes.push(newTheme);
	
	// creates the new button
	buttonGenerator();
});



buttonGenerator();
 
