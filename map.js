mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYXptIiwiYSI6ImNsMWprZGNubjFscGozbHFrcG41dDh5bmkifQ.oq4bHdIFMK-OUA4k1Ux3bQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tanazm/cl48mmbpm000b14mot5ubna90',
    zoom: 3,
    maxZoom: 13,
    minZoom: 3.5,
    center: [-99, 38],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
  });

  map.on("load", function () {
    map.addLayer(
      {
        id: "us_police",
        type: "circle",
        source: {
          type: "geojson",
          data: "data/policeBrutality.geojson",
        },
        paint: {
          "circle-radius": 7,
          "circle-color": "#e9b34e",
          "circle-stroke-color": "#e9b34e",
          "circle-opacity": 0.1,
        },
      },
      "waterway-label"
    );
    map.addLayer(
      {
        id: "us_states_outline",
        type: "line",
        source: {
          type: "geojson",
          data: "data/statefinal.geojson",
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 0,
        },
      },
      "us_police"
    );
  });
  
  map.on("click", "us_police", function (e) {
    var stateName = e.features[0].properties.state;
    var cityName = e.features[0].properties.city;
    var date = e.features[0].properties.date;
    var description = e.features[0].properties.description;
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h4>" +
          cityName +
          ", " +
          stateName +
          "</h4>" +
          "<h5>" +
          date +
          "</h5>" +
          "<h5>" +
          description +
          "</h5>"
      )
      .addTo(map);
  });
  map.on("mouseenter", "us_police", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "us_police", function () {
    map.getCanvas().style.cursor = "";
  });