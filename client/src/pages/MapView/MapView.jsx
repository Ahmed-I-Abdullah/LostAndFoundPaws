import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./MapView.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGF1cnkyMDAxIiwiYSI6ImNsdTVzaWh3djBrOG8ya3FybnJpZmNlY2QifQ.56T13WpUblGuqpzfD6n_SA";
const calgaryCoords = [-114.0719, 51.0447];

const MapView = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: calgaryCoords,
      zoom: 10.5,
    });
    // map.on("load", () => {
    //   map.addControl(new mapboxgl.NavigationControl(), "top-right");
    //   new mapboxgl.Marker().setLngLat(calgaryCoords).addTo(map);
    // });
    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default MapView;
