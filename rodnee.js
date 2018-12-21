

$(document).ready(function () {


$("#add-event").on("click", function(event) {
    
    event.preventDefault();

   
 event = $("#event-input").val().trim();


 
 
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" +
 event + "&size=1&apikey=exjiYSnDEt1bNf9JQHhvljoCD4tUdae2";

    // Here we run our AJAX call to the Ticket Master API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        $("#show").html("<h1>Events" + response.name + "</h1>");
      $("#show").html("<p>" + response.event + "</p>");

        
      });
      });

     
    });
