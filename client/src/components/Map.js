import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import your custom marker icon image


function Map() {
  const lat = 18;
  const lon = 73;

  useEffect(() => {
    const map = L.map("map").setView([lat, lon], 13);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }
    ).addTo(map);

    // Pass the custom icon to the marker function
    L.marker([lat, lon], ).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lon]);

  return <div className="mapbox" id="map"></div>;
}

export default Map;
