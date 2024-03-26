import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./MapWithPin.css";

// Public access token, don't woryy
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWhtZWRpMjAyNCIsImEiOiJjbHU2aWVuZG8yMGduMmptMjkxOWN1dXdmIn0.r-XM9IvEuxRJ2ugmdTzWKg";

const MapWithPin = ({ longitude, latitude }) => {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("load", function () {
      map.resize();
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapWithPin;
