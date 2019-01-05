function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: {
            lat: -28.024,
            lng: 140.887
        }
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}

var locations = [];

function empty() {
    locations.length = 0;
    console.log(locations);
}

$(document).ready(function () {
    $('#result-body').hide();
});
// var locations = [{lat: 10, lng: 10}];

//Click event
$("#search").on("click", function (event) {
    empty();
    event.preventDefault();
    
    searchEvent = $(".event-input").val().trim();
    $("#event").empty();
   

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
                var longitude = response._embedded.events[i]._embedded.venues[0].location.longitude;
                var latitude = response._embedded.events[i]._embedded.venues[0].location.latitude;
                var link = response._embedded.events[i].url;
                var eventImage = response._embedded.events[i].images[i].url;
                console.log(link);
                console.log(longitude);
                console.log(latitude);
                locations.push({
                    lat: +latitude,
                    lng: +longitude
                });
                console.log(locations);
                var btn = document.createElement("BUTTON");        // Create a <button> element
                    var t = document.createTextNode("Choose Event");       // Create a text node
                    btn.appendChild(t);
                    $(btn).addClass("showEvent"); 
                $("#event").append("<div id='result'><h3>Events: " + eventName + " on " + eventDate + "</h3>" +
                    "<h5>Where: " + eventCity + " At Venue: " + eventVenue + "</h5><img id='resultImage' src=' " + eventImage + "'><button class='btn btn-primary glow-input-button'> <a href=" + link + ">Purchase tickets</a></button></div><br>");
                                                  // Append the text to <button>
                    //$("#result").prepend(btn);//
                   
                  // $('#result').append("<input type='submit' value='Choose Event'>");
                   //var button = document.createElement("button")
                  // var b = document.createTextNode("Choose Event");
                 //  button.appendChild(b);
                 //  $('#result').appendChild(button);
                }
            initMap();
            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

        });
});