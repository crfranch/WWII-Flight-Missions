// function buildCharts(missions) {

var url = "/Data";
d3.json(url).then(function(charts) {

    var trace1 = {
        type: 'bar',
        marker: {color: 'rgb(66,179,0)'},
        x: charts.map(row => row.AIRCRAFT_NAME),
        y: charts.map(row => row.MSNDATE),
        transforms: [{
            type: 'aggregate',
            groups: charts.map(row => row.MSNDATE),
            aggregations: [
                {target: 'y', func: 'count', enabled: true},
            ]
        }],
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
          }],
        hoverinfo: [{
            type: 'aggregate',
            groups: charts.map(row => row.MSNDATE),
            aggregations: [
                {target: 'y', func: 'count', enabled: true},
            ]
        }]
    }
    // console.log(trace1)
    var planes = [trace1];

    var layout1 = {
        plot_bgcolor: '#1B191F',
        name: 'Number of Flight Missions for Each Aircraft'
    }

    Plotly.plot('plot1', planes, layout1);

    var trace2 = {
        type: 'bar',
        marker: {color: 'rgb(199,43,43)'},
        x: charts.map(row => row.TGT_COUNTRY),
        y: charts.map(row => row.MSNDATE),
        transforms: [{
            type: 'aggregate',
            groups: charts.map(row => row.MSNDATE),
            aggregations: [
                {target: 'y', func: 'count', enabled: true},
            ]
        }],
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
          }]
    }
    // console.log(trace1)
    var countries = [trace2];

    var layout2 = {
        plot_bgcolor: '#1B191F',
        name: 'Number of Flight Missions for Each Aircraft'
    }

    Plotly.plot('plot2', countries, layout2);

    // var trace3 = {
    //     type: 'bar',
    //     marker: {color: 'rgb(66,179,0)'},
    //     x: charts.map(row => row.YEAR),
    //     y: charts.map(row => row.MSNDATE),
    //     transforms: [{
    //         type: 'aggregate',
    //         groups: charts.map(row => row.MSNDATE),
    //         aggregations: [
    //             {target: 'y', func: 'count', enabled: true},
    //         ]
    //     }],
    //     transforms: [{
    //         type: 'sort',
    //         target: 'y',
    //         order: 'descending'
    //       }]
    // }
    // // console.log(trace1)
    // var year = [trace3];

    // var layout3 = {
    //     plot_bgcolor: 'black',
    //     name: 'Number of Flight Missions for Each Aircraft'
    // }

    // Plotly.plot('plot3', year, layout3);


    // Create the createMap function
    // function createMap(Flight_Mission){

        // Create the tile layer that will be the base of the map
    // // var myMap = L.map("map-container", {
    // //     center: [54.5260, 15.2551],
    // //     zoom: 12
    // });
    var nav = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v2/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.navigation-guidance-night",
        accessToken: API_KEY
    });

    var map = L.map("globe-container", {
        center: [51.0899239, 5.9683775],
        zoom: 12,
    });

    nav.addTo(map);

        // Initialize layers for a basic map
        // Create a baseMaps object to hold the navigator_guidancemap layer
        // var baseMaps = {
        // "Navigation Guidance Map": navigator_guidancemap
        // };

        // Create an overlayMaps object to hold the flight mission data
        // var overlayMaps = {
        //     "Flight Missions":Flight_Mission
        // };
        // Basic Map to focus on the center of Europe
        // var myMap = L.map("map-container", {
        //     center: [54.5260, 15.2551],
        //     zoom: 12
        //     // layers: [navigator_guidancemap, Flight_Mission]
        //     });

        // Create a layer control, pass in the baseMaps and overlayMaps.
        // Add the layer control to the map.
        // L.control.layers(baseMaps, overlayMaps, {
        //     collapsed: false
        // }).addTo(map);
    // }

    // function createMarkers(response) {

    //     // Pull the "Flight Missions" off of response.data
    //     var flightMissions = response.data.Flight_Mission

    //     // Initialize an array to hold data of flight missions
    //     var flightMissions = [];

    //     // Loop through the Flight Missions array
    //     for (var index = 0; index < flightMissions.length; index ++) {
    //         var flight = flights[index];

    //         // For each flight mission, create a marker and bind a popup with the Flight Mission Info:
    //         var flightMarker = L.marker([flight.LATITUDE, flight.LONGITUDE, flight.TGT_COUNTRY, flight.AIRCRAFT_NAME)
    //             .bindPopup("<h3> Latitude: " + flight.LATITUDE + "<h3><h3> Longitude: " + flight.LONGITUDE +  "<h3> Target Country :" + flight.TGT_COUNTRY + "<h3>")

    //         // Add the marker to the flightMarkers array
    //         flightMarkers.push(flightMarker);
    //     }

    // // Create a layer group made from the bike markers array, pass it into the createMap function
    // createMap(L.layerGroup(flightMarkers));
    // }
    
    // // Perform a GET request to the query URL
    // // d3.json(queryURL, function(Flight_Mission) {

    // // Perform an API call to the WWII Flight Missions to get Flight Mission information. Call createMarkers when complete
    // // d3.json("insert geojson URL here", createMarkers);

});
// }