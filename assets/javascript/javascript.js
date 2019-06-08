window.onload = function () {
  /*There are 2 inputs and 1 button on the homepage.  
           
      Button 1 - #submit     
          On "click" needs to authenticate user and password. 

  */
  //creates a variable to store input from form
  var user = $('#user').val();
  var password = $('#password').val();
  console.log(user);
  console.log(password);


  /////////////////////////////////////////////////////////////////////////////
  /* 
  There are 6 inputs and 2 buttons on the main page that need script. 

      Button 1 :  #addBtn
          On "click" needs to --> 
              1)Retrieve input from form and list the event in the event display area.
              2)Connect to both API's 


      Button 2 : #eventSearch
          On "click" needs to -->
              1) Match the input from #searchInput with an event in the events list. 
              2) Highlight the searched events in the display area. 

  */

  //creates a variable to store input from form for button 1.
  var eventCreator = $('#squadLeader').val();
  var eventName = $('#inputEventName').val();
  var dateTime = $('#DT').val();
  var location = $('#location').val();
  var eventDescription = $('#eventDescription').val();
  var teamRoster = $('#roster').val();

  console.log(eventCreator);
  console.log(eventName);
  console.log(dateTime);
  console.log(location);
  console.log(eventDescription);
  console.log(teamRoster)

  //creates a variable to store input from form for button 2.
  var search = $('#searchInput').val();
  console.log(search);







  ///////////////////////////////////////////////////////////////////////////////////////
  //GOOGLE API SECTION
  //////////////////////////////////////////////////////////////////////////////////////

  //Geolocation
  var map, infoWindow;

  function initMap() {
    map = new google.maps.Map(document.getElementById('google-maps-display'), {
      center: {
        lat: 35.227,
        lng: -80.843
      },
      zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }






  ///////////////////////////////////////////////////////////////////////////////////////
  //YELP API SECTION
  //////////////////////////////////////////////////////////////////////////////////////

  retrieveBusinessInformation();

  var userInputAddress = "Freedom Park";

  function retrieveBusinessInformation() {

    var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=1&location=" + userInputAddress;

    $.ajax({
        url: idQueryUrl,
        method: "GET",
        headers: {
          Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
        }
      })
      .then(function ({
        businesses
      }) {
        var businessId = businesses[0].id;

        var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

        $.ajax({
            url: locationDetailsQueryUrl,
            method: "GET",
            headers: {
              Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
            }
          })
          .then(function (locationDetails) {
            console.log (locationDetails);
            $("#yelp-display").html("Name: " + locationDetails.name);
            $("#yelp-display").html($("#yelp-display").html() + "Rating: " + locationDetails.rating);
          })
      })
  };
};



///////////////////////////////////////////////////////////////////////////////////////
//FIREBASE SECTION
//////////////////////////////////////////////////////////////////////////////////////