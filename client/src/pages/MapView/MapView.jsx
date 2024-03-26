import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { rgba } from "polished";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Toggle from "../../components/Toggle/Toggle";
import theme from "../../theme/theme";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapView.css";

const MapView = () => {
  const navigate = useNavigate();
  const [lostCoords, setLostCoords] = useState([]);
  const [foundCoords, setFoundCoords] = useState([]);
  const [sightingCoords, setSightingCoords] = useState([]);
  const [lostMarkers, setLostMarkers] = useState([]);
  const [foundMarkers, setFoundMarkers] = useState([]);
  const [sightingMarkers, setSightingMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const initialIndex = 1;
  const calgaryCoords = [-114.0719, 51.0447];
  mapboxgl.accessToken =
    "pk.eyJ1IjoibGF1cnkyMDAxIiwiYSI6ImNsdTVzaWh3djBrOG8ya3FybnJpZmNlY2QifQ.56T13WpUblGuqpzfD6n_SA";

  // TODO: Implement fetching reports from the server
  // Fetch lost, found, and sighting reports from the server
  useEffect(() => {
    setLostCoords([
      [-114.1025, 51.0342],
      [-114.0719, 51.0447],
    ]);
    setFoundCoords([[-114.0719, 51.0447]]);
    setSightingCoords([[-114.078, 51.0562]]);
  }, []);

  const viewTypeOptions = [
    {
      label: "List View",
      icon: <FontAwesomeIcon icon={faList} />,
      color: rgba(theme.palette.primary.main, 0.3),
    },
    {
      label: "Map View",
      icon: <FontAwesomeIcon icon={faMap} />,
      color: rgba(theme.palette.primary.main, 0.3),
    },
  ];

  const reportTypeOptions = [
    { label: "All", color: rgba(theme.palette.primary.main, 0.3) },
    { label: "Lost", color: rgba("#FDC0C0", 0.5) },
    { label: "Found", color: rgba("#8DFD8D", 0.5) },
    { label: "Sightings", color: rgba("#FDFD8D", 0.5) },
  ];

  // Initialize the map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: calgaryCoords,
      zoom: 11,
    });

    // Add geocoder (search bar)
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Enter city, neighborhood, or address",
      }),
      "top-right"
    );

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Add markers for lost, found, and sighting reports
    const lostMarkers = lostCoords.map((coord) =>
      new mapboxgl.Marker({ color: "red" }).setLngLat(coord).addTo(map)
    );
    const foundMarkers = foundCoords.map((coord) =>
      new mapboxgl.Marker({ color: "green" }).setLngLat(coord).addTo(map)
    );
    const sightingMarkers = sightingCoords.map((coord) =>
      new mapboxgl.Marker({ color: "yellow" }).setLngLat(coord).addTo(map)
    );

    // TODO: Implement clustering
    // map.on("load", () => {
    //   map.addSource("reports", {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [...lostCoords, ...foundCoords, ...sightingCoords].map(
    //         (coord) => ({
    //           type: "Feature",
    //           geometry: {
    //             type: "Point",
    //             coordinates: coord,
    //           },
    //         })
    //       ),
    //     },
    //     cluster: true,
    //     clusterMaxZoom: 14,
    //     clusterRadius: 50,
    //   });

    //   map.addLayer({
    //     id: "clusters",
    //     type: "circle",
    //     source: "reports",
    //     filter: ["has", "point_count"],
    //     paint: {
    //       "circle-color": [
    //         "step",
    //         ["get", "point_count"],
    //         "#51bbd6",
    //         100,
    //         "#f1f075",
    //         750,
    //         "#f28cb1",
    //       ],
    //       "circle-radius": [
    //         "step",
    //         ["get", "point_count"],
    //         20,
    //         100,
    //         30,
    //         750,
    //         40,
    //       ],
    //     },
    //   });

    //   map.addLayer({
    //     id: "cluster-count",
    //     type: "symbol",
    //     source: "reports",
    //     filter: ["has", "point_count"],
    //     layout: {
    //       "text-field": "{point_count_abbreviated}",
    //       "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    //       "text-size": 12,
    //     },
    //   });

    //   map.addLayer({
    //     id: "unclustered-point",
    //     type: "circle",
    //     source: "reports",
    //     filter: ["==", ["get", "point_count"], 1],
    //     paint: {
    //       "circle-color": "#11b4da",
    //       "circle-radius": 4,
    //       "circle-stroke-width": 1,
    //       "circle-stroke-color": "#fff",
    //     },
    //   });
    // });

    setMap(map);
    setLostMarkers(lostMarkers);
    setFoundMarkers(foundMarkers);
    setSightingMarkers(sightingMarkers);

    return () => map.remove();
  }, []);

  const handleViewTypeToggle = (index) => {
    const view = viewTypeOptions[index].label;
    if (view === "List View") {
      navigate("/");
    } else if (view === "Map View") {
      navigate("/mapView");
    }
  };

  // function hasDuplicates(array) {
  //   const set = new Set(array.map(JSON.stringify));
  //   return set.size < array.length;
  // }

  useEffect(() => {
    if (map) {
      // Remove all markers from the map
      lostMarkers.forEach((marker) => marker.remove());
      foundMarkers.forEach((marker) => marker.remove());
      sightingMarkers.forEach((marker) => marker.remove());

      // Filter markers based on the selected report type
      if (selectedReportType === "Lost") {
        lostMarkers.forEach((marker) => marker.addTo(map));
      } else if (selectedReportType === "Found") {
        foundMarkers.forEach((marker) => marker.addTo(map));
      } else if (selectedReportType === "Sightings") {
        sightingMarkers.forEach((marker) => marker.addTo(map));
      } else {
        lostMarkers.forEach((marker) => marker.addTo(map));
        foundMarkers.forEach((marker) => marker.addTo(map));
        sightingMarkers.forEach((marker) => marker.addTo(map));
      }

      // let coords = [];
      // if (selectedReportType === "All") {
      //   coords = [...lostCoords, ...foundCoords, ...sightingCoords];
      // } else if (selectedReportType === "Lost") {
      //   coords = lostCoords;
      // } else if (selectedReportType === "Found") {
      //   coords = foundCoords;
      // } else if (selectedReportType === "Sightings") {
      //   coords = sightingCoords;
      // }

      // map.on("load", () => {
      //   map.getSource("reports").setData({
      //     type: "FeatureCollection",
      //     features: coords.map((coord) => ({
      //       type: "Feature",
      //       geometry: {
      //         type: "Point",
      //         coordinates: coord,
      //       },
      //     })),
      //   });

      //   if (hasDuplicates(coords)) {
      //     if (!map.getLayer("clusters")) {
      //       map.addLayer({
      //         id: "clusters",
      //         type: "circle",
      //         source: "reports",
      //         filter: ["has", "point_count"],
      //         paint: {
      //           "circle-color": "#51bbd6",
      //           "circle-radius": [
      //             "step",
      //             ["get", "point_count"],
      //             20,
      //             100,
      //             30,
      //             750,
      //             40,
      //           ],
      //         },
      //       });
      //     }
      //     if (!map.getLayer("cluster-count")) {
      //       map.addLayer({
      //         id: "cluster-count",
      //         type: "symbol",
      //         source: "reports",
      //         filter: ["has", "point_count"],
      //         layout: {
      //           "text-field": "{point_count_abbreviated}",
      //           "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      //           "text-size": 12,
      //         },
      //       });
      //     }
      //   } else {
      //     if (map.getLayer("clusters")) {
      //       map.removeLayer("clusters");
      //     }
      //     if (map.getLayer("cluster-count")) {
      //       map.removeLayer("cluster-count");
      //     }

      //     if (selectedReportType === "Lost") {
      //       lostMarkers.forEach((marker) => marker.addTo(map));
      //     } else if (selectedReportType === "Found") {
      //       foundMarkers.forEach((marker) => marker.addTo(map));
      //     } else if (selectedReportType === "Sightings") {
      //       sightingMarkers.forEach((marker) => marker.addTo(map));
      //     }
      //   }
      // });
    }
  }, [map, selectedReportType]);

  const handleReportTypeToggle = (index) => {
    setSelectedReportType(reportTypeOptions[index].label);
  };

  return (
    <body>
      <div id="map" />
      <div className="toggle-group">
        <div className="toggle">
          <Toggle
            options={viewTypeOptions}
            onToggleCallback={handleViewTypeToggle}
            initialIndex={initialIndex}
          />
        </div>
        <div className="toggle">
          <Toggle
            options={reportTypeOptions}
            onToggleCallback={handleReportTypeToggle}
          />
        </div>
        <div />
        <div />
      </div>
    </body>
  );
};

export default MapView;
