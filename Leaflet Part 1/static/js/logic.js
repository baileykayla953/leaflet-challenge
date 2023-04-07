// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
    center: [37.967877, -97.504732],
    zoom: 5
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


  let url ='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
  
  //read in data from url 
  d3.json(url).then((data) => {
    // creating names for each element in the drop down 
    console.log(data)



// create legened with color and value
function getValue(x) {
	return x > 90 ?  '#F06A6A': 
	       x > 70 ? '#F0A76A' :
	       x > 50 ? '#F3B94C' :
	       x > 30 ? '#F3DB4C' :
	       x > 10 ?  '#E1F34C':
	       
           '#B6F34C';
}


function style(feature) {
	return {
		opacity: 1,
      fillOpacity: 1,
      fillColor: getValue(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: feature.properties.mag * 5,
      stroke: true,
      weight: 0.5

	};
}

//setting coordinate points 
var dat = L.geoJson(data, {
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, style(feature));
	},


// Binding a popup to each layer
onEachFeature: function(feature, layer) {
    layer.bindPopup("<strong>location" + feature.properties.place + "</strong><br /><br />magnitude: " +
      feature.properties.mag + "<br /><br />depth: " + feature.geometry.coordinates[2]);
  }
}).addTo(myMap);





dat.addTo(myMap);

 // Set up the legend.
 let legend = L.control({ position: "bottomright" });
 legend.onAdd = function() {
   let div = L.DomUtil.create("div", "info legend");
   let limits = [-10,10,30,50,70,90]
   let colors = [ '#B6F34C','#E1F34C','#F3DB4C','#F3B94C','#F0A76A','#F06A6A']
  

   for (let i = 0; i < limits.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + limits[i] + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
  }
  return div;
};

 // Adding the legend to the map
 legend.addTo(myMap);




  
    })

    