import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { formatDistanceToNow } from "date-fns";
import theme from "../../theme/theme";
import arrowIcon from "../../assets/images/arrowIcon.png";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapView.css";

// TODO: Implement fetching reports from the server
const markersData = [
  {
    id: "1",
    name: "Cooper",
    status: "LOST",
    lastKnownLocation: {
      latitude: -114.1025,
      longitude: 51.0342,
      address: "Bankview",
    },
    images: [
      "https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J",
    ],
    createdAt: "2024-03-24T10:00:00Z",
  },
  {
    id: "2",
    name: "Nala",
    status: "FOUND",
    lastKnownLocation: {
      latitude: -114.078,
      longitude: 51.0562,
      address: "Sunnyside",
    },
    images: [
      "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg?crop=0.6672958942897593xw:1xh;center,top&resize=980:*",
    ],
    createdAt: "2024-03-23T15:30:00Z",
  },
  {
    id: "3",
    status: "SIGHTING",
    lastKnownLocation: {
      latitude: -114.0201,
      longitude: 51.0342,
      address: "Inglewood",
    },
    images: [
      "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/07/Stray-Kittens-scaled.jpg",
    ],
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: "4",
    status: "SIGHTING",
    lastKnownLocation: {
      latitude: -114.14,
      longitude: 51.0703,
      address: "University Heights",
    },
    images: ["https://toegrips.com/wp-content/uploads/stray-puppy-jake-.jpg"],
    createdAt: "2024-03-22T10:00:00Z",
  },
];

const MapView = ({ selectedType }) => {
  const [markers, setMarkers] = useState([]);
  const calgaryCoords = [-114.0719, 51.0447];

  const getStatusColor = (status) => {
    switch (status) {
      case "LOST":
        return theme.palette.custom.selectedCategory.lost.dark;
      case "FOUND":
        return theme.palette.custom.selectedCategory.found.dark;
      case "SIGHTING":
        return theme.palette.custom.selectedCategory.sighting.dark;
      default:
        return "";
    }
  };

  mapboxgl.accessToken =
    "pk.eyJ1IjoibGF1cnkyMDAxIiwiYSI6ImNsdTVzaWh3djBrOG8ya3FybnJpZmNlY2QifQ.56T13WpUblGuqpzfD6n_SA";

  // Initialize the map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: calgaryCoords,
      zoom: 11,
    });

    map.on("load", () => {
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

      // TODO: Add clusters for same location markers
      // Add markers
      const newMarkers = [];
      for (const markerData of markersData) {
        if (
          selectedType !== "All" &&
          markerData.status.toLowerCase() !== selectedType.toLowerCase()
        ) {
          continue;
        }

        const marker = new mapboxgl.Marker({
          color: getStatusColor(markerData.status),
        })
          .setLngLat([
            markerData.lastKnownLocation.latitude,
            markerData.lastKnownLocation.longitude,
          ])
          .setPopup(
            new mapboxgl.Popup({ maxWidth: "350px" }).setHTML(`
                <div class="popup-card">
                    <img src=${
                      markerData.images[0]
                    } alt="pet-picture" class="popup-image" />
                  <div class="popup-content">
                    ${
                      markerData.name
                        ? `<h2 style="margin: 0px">${markerData.name}</h2>`
                        : ""
                    }
                    <span style="background-color: ${getStatusColor(
                      markerData.status
                    )}" class="status">${markerData.status}</span>
                    <p style="margin: 0px">Posted ${formatDistanceToNow(
                      new Date(markerData.createdAt)
                    )} ago</p>
                    <a href="/posts/8e6baced-4b04-4f28-93a2-c5ee346a4b97" class="arrow">
        <img src=${arrowIcon} alt="view-post-arrow" class="arrow-image" />
      </a>
                  </div>
                </div>
              `)
          )
          .addTo(map);

        newMarkers.push(marker);
      }
      setMarkers(newMarkers);
    });
    return () => map.remove();
  }, [selectedType]);

  return (
    <body>
      <div id="map" />
    </body>
  );
};

export default MapView;
