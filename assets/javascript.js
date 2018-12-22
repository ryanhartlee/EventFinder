function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {
            lat: 10,
            lng: -50
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
    $('#result-body').show();
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
                var longitude = response._embedded.events[i]._embedded.venues[0].location.longitude;
                var latitude = response._embedded.events[i]._embedded.venues[0].location.latitude;
                console.log(longitude);
                console.log(latitude);
                locations.push({
                    lat: +latitude,
                    lng: +longitude
                });
                console.log(locations);
                $("#event").append("<div id='result'><h3>Events: " + eventName + " on " + eventDate + "</h3>" +
                    "<h5>Where: " + eventCity + " At Venue: " + eventVenue + "</h5></div><br>");

            }
            initMap();
            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

        });
});