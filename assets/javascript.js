function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {
            lat: 30,
            lng: 0
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

var config = {
    apiKey: "AIzaSyCkHE8KmFWD4RpCqEqYmy7UpoygU8MWzFE",
    authDomain: "project1-8ca19.firebaseapp.com",
    databaseURL: "https://project1-8ca19.firebaseio.com",
    projectId: "project1-8ca19",
    storageBucket: "project1-8ca19.appspot.com",
    messagingSenderId: "572197543603"
};
firebase.initializeApp(config);

var database = firebase.database();

var searchEvent = "";

//Click event
$("#search").on("click", function (event) {
    empty();
    event.preventDefault();

    searchEvent = $(".event-input").val().trim();
    $("#event").empty();

    database.ref().push({
        searchEvent: searchEvent
    });

    database.ref().on("child_added", function (snapshot) {
        var sv = snapshot.val();
        console.log(sv.eventSearch);
        $('#result').text(sv.searchEvent);
    });



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

                var btn = document.createElement("BUTTON"); // Create a <button> element
                var t = document.createTextNode("Choose Event"); // Create a text node
                btn.appendChild(t);
                $(btn).addClass("showEvent");
                $("#event").append("<div class='flip'><div class='front pic' style='background-image: url(" + eventImage + ")''><h1 class='text-shadow'>" + eventName + "</h1></div><div class='back'><h2>" + eventCity + "</h2><p>" + eventDate + "</p><p>" + eventVenue + "<br><a href='" + link + "' target='_blank'><button class='btn btn-primary glov-input-button'>Purchase</button></a></div></div>");
                
                initMap();
                // Log the queryURL
                console.log(queryURL);
                
                // Log the resulting object
                console.log(response);
            };


        });

});