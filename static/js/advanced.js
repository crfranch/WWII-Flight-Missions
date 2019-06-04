// Create the tile layer that will be the base of the map
    var navigator_guidancemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v2/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data & copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.navigation-guidance-night"
      accessToken: API_KEY
});

// Advanced Map
// Initialize all of the LayerGroups (if we want to take this route)
var layers = {
    MSN_DATE: new L.LayerGroup(),
    AIRCRAFT_NAME: new L.LayerGroup(),
    COUNTRY_FLYING_MISSION: new LayerGroup(),
    TGT_COUNTRY: new L.LayerGroup(),
};

// Advanced Map to focus on the center of Europe
var myMap = L.map("map svg-map", {
    center: [54.5260, 15.2551],
    zoom: 12
    layers: [
        layers.MSN_DATE,
        layers.AIRCRAFT_NAME,
        layers.COUNTRY_FLYING_MISSION,
        layers.TGT_COUNTRY
    ]
});

// Add navigation_guicance layer to the map
navigator_guidancemap.addTo(map);

// Create an overlays obejct to add to the layer control
var overlays = {
    "Mission Date": layers.MSN_DATE,
    "Aircraft Type": layers.AIRCRAFT_NAME,
    "Country Flying Mission": layers. COUNTRY_FLYING_MISSION,
    "Target Country": layers. TGT_COUNTRY
};

// Create a control for layers, and hten add overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display map info
var info = L.control({
    position: "bottomright"
});

// Once layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

// Add the new legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
    COUNTRY_FLYING_MISSION: L.ExtraMarkers.icon({
        icon:"ion-settings",
        iconColor: "red",
        markerColor: "red",
        shape: "star"
    }),
    TGT_COUNTRY: L.ExtraMarkers.icon({
        icon:"ion-settings",
        iconColor: "black",
        markerColor: "black",
        shape: "star"
    })
};

d3.json("/Data"), function(infoRes) {
    
    // When the first API call is complete, perform another call to the 
}