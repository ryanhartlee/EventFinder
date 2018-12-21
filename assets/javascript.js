$(document).ready(function () {
    $('#result-body').hide();
    
    
    $("#search").on("click", function (event) {
        event.preventDefault();

        searchEvent = $(".event-input").val().trim();
        $("#event").empty();
        $("#result-body").show();


        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" +
            searchEvent + "&apikey=exjiYSnDEt1bNf9JQHhvljoCD4tUdae2";
        $ <
            // Here we run our AJAX call to the Ticket Master API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
            // We store all of the retrieved data inside of an object called "response"
            .then(function (response) {
                for (var i = 0; i < response._embedded.events.length; i++) {
                    var eventName = response._embedded.events[i].name
                    var eventDate = response._embedded.events[i].dates.start.localDate
                    var eventVenue = response._embedded.events[i]._embedded.venues[0].name
                    var eventCity = response._embedded.events[i]._embedded.venues[0].city.name


                    $("#event").append("<div id='result'><h3>Events: " + eventName + " on " + eventDate + "</h3>" +
                        "<h5>Where: " + eventCity + " At Venue: " + eventVenue + "</h5></div><br>");
                    // $("#showNext").append("<p>Where: " + eventCity + " At Venue: " + eventVenue + "</p>")
                }

                // var eventName = response._embedded.events[0].name
                //var eventDate = response._embedded.events[0].dates.start.localDate
                //var eventVenue = response._embedded.events[0]._embedded.venues[0].name
                //var eventCity = response._embedded.events[0]._embedded.venues[0].city.name  


                // Log the queryURL
                console.log(queryURL);

                // Log the resulting object
                console.log(response);

                //$("#show").html("<h1>Events: "+ eventName + " on " + eventDate + "</h1>");
                //console.log(response._embedded.events[0].dates.start.localDate);

                //$("#showNext").html("<p>Where: " + eventCity + " At Venue: " + eventVenue + "</p>");
                //console.log(eventCity, eventVenue);


            });
    });


});