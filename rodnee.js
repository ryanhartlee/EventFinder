

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


            var eventName = response._embedded.events[0].name
            var eventDate = response._embedded.events[0].dates.start.localDate
            var eventVenue = response._embedded.events[0]._embedded.venues[0].name
            var eventCity = response._embedded.events[0]._embedded.venues[0].city.name


        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        $("#show").html("<h1>Events: "+ eventName + " on " + eventDate + "</h1>");
        console.log(response._embedded.events[0].dates.start.localDate);
       
        $("#showNext").html("<p>Where: " + eventCity + " At Venue: " + eventVenue + "</p>");
        console.log(eventCity, eventVenue);

        
      });
      });

     
    });
