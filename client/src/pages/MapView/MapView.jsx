import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapView.css";

import theme from "../../theme/theme";
import SightingDialog from "../../components/SightingDialog/SightingDialog";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";

import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { CircularProgress, Typography } from "@mui/material";
import { downloadData } from "@aws-amplify/storage";
import { useUser } from "../../context/UserContext";
import { getSightingEmail, getSightingPhoneNumber } from "../../utils/utils";

const MapView = ({ selectedType, filterPosts, filterSightings, applyClicked }) => {
  const [, setMarkers] = useState([]);
  const [markersData, setMarkersData] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [postsData, setPostsData] = useState([]);
  const [sightingsData, setSightingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [, setSelectedId] = useState(null);
  const [selectedSighting, setSelectedSighting] = useState(null);
  const calgaryCoords = [-114.0719, 51.0447];
  const { userState, currentUser } = useUser();
  let client = generateClient({ authMode: "apiKey" });
  if (userState !== "Guest") {
    client = generateClient({ authMode: "userPool" });
  }

  const openDialog = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      if (didCancel) {
        return;
      }
      try {
        let posts = filterPosts || [];
        if (filterPosts === null) {
          const listPostsResponse = await client.graphql({
            query: queries.listPosts,
          });
          posts = listPostsResponse.data.listPosts.items;
        }
        // console.log("posts", posts);
        // console.log("filterPosts", filterPosts);
        const postsInfo = await Promise.all(
          posts.map(async (post) => {
            const imageData = await downloadData({ key: post.images[0] })
              .result;
            const imageSrc = URL.createObjectURL(imageData.body);
            return {
              id: post.id,
              userId: post.userID,
              name: post.name,
              species: post.species,
              image: imageSrc,
              status: post.status,
              lastKnownLocation: post.lastKnownLocation,
              email: "",
              phoneNumber: "",
              createdAt: post.createdAt,
            };
          })
        );

        let sightings = filterSightings || [];
        if (filterSightings === null) {
          const listSightingsResponse = await client.graphql({
            query: queries.listSightings,
          });
          sightings = listSightingsResponse.data.listSightings.items;
        }
        const sightingsInfo = await Promise.all(
          sightings.map(async (sighting) => {
            const imageData = await downloadData({ key: sighting.image })
              .result;
            const imageSrc = URL.createObjectURL(imageData.body);
            return {
              id: sighting.id,
              userId: sighting.userID || "",
              name: "",
              species: "",
              image: imageSrc,
              status: "SIGHTING",
              lastKnownLocation: sighting.location,
              email: getSightingEmail(sighting),
              phoneNumber: getSightingPhoneNumber(sighting),
              createdAt: sighting.createdAt,
            };
          })
        );

        const newMarkersData = [...postsInfo, ...sightingsInfo];
        setMarkersData(newMarkersData);
        setPostsData(posts);
        setSightingsData(sightings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    return () => {
      didCancel = true;
    };
  }, [
    selectedType,
    JSON.stringify(filterPosts),
    JSON.stringify(filterSightings),
    applyClicked,
  ]);

  const deleteSighting = async (id) => {
    setLoading(true);
    const deleteInput = {
      id: id,
    };
    try {
      await client.graphql({
        query: mutations.deleteSighting,
        variables: { input: deleteInput },
      });
      const newSightingsData = sightingsData.filter(
        (sighting) => sighting.id !== id
      );
      setSightingsData(newSightingsData);
      handleToastOpen("success", "Successfully deleted sighting post.");
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    } catch (error) {
      handleToastOpen("error", "Error deleting sighting post.");
      console.error("Error deleting sighting post: ", error);
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    }
    setLoading(false);
  };

  const handleToastOpen = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "LOST":
        return theme.palette.custom.selectedCategory.lost.dark;
      case "FOUND":
        return theme.palette.custom.selectedCategory.found.dark;
      case "SIGHTING":
        return theme.palette.custom.selectedCategory.sighting.dark;
      default:
        return theme.palette.custom.greyBkg.tag;
    }
  };

  const getStatusLabelHTML = (status) => {
    const backgroundColor = getStatusColor(status);

    return `
      <div style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        height: 32px;
        width: fit-content;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.75;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        border-radius: 5px;
        background-color: ${backgroundColor};
      ">
        ${status}
      </div>
    `;
  };

  mapboxgl.accessToken =
    process.env.REACT_APP_MAPBOX_API_KEY ||
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

      // Add markers
      const newMarkers = [];
      for (const markerData of markersData) {
        if (
          selectedType !== "All" &&
          markerData.status.toLowerCase() !== selectedType.toLowerCase()
        ) {
          continue;
        }

        const popup = new mapboxgl.Popup({
          maxWidth: "400px",
          closeButton: false,
        }).setHTML(`
          <div id="popup-${markerData.id}" class="popup-card">
            <img src="${
              markerData.image
            }" alt="pet-picture" class="popup-image" />
            <div class="popup-content">
              ${`<h2 style="margin: 0px">${markerData.name}</h2>`}
              <div class="labels">
                <div class="label">
                  ${getStatusLabelHTML(markerData.status)}
                </div>
                ${
                  markerData.species
                    ? getStatusLabelHTML(markerData.species)
                    : ""
                }
              </div>
              <Typography style="margin: 0px; font-size: 14px; color: #979797;">
                Posted: ${markerData.createdAt.split("T")[0]}
              </Typography>
            </div>
          </div>
      `);

        const marker = new mapboxgl.Marker({
          color: getStatusColor(markerData.status),
        })
          .setLngLat([
            markerData.lastKnownLocation.longitude,
            markerData.lastKnownLocation.latitude,
          ])
          .setPopup(popup)
          .addTo(map);

        newMarkers.push(marker);

        popup.on("open", () => {
          const popupElement = document.getElementById(
            `popup-${markerData.id}`
          );
          popupElement.addEventListener("click", (e) => {
            e.preventDefault();
            if (markerData.status === "SIGHTING") {
              setSelectedSighting(markerData);
              openDialog(markerData.id);
            } else {
              window.location.href = `/posts/${markerData.id}`;
            }
          });
        });
      }
      setMarkers(newMarkers);
    });
    return () => map.remove();
  }, [selectedType, markersData]);

  return (
    <>
      <div id="map">
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
      {!loading && (
        <>
          <SightingDialog
            id={selectedSighting?.id}
            userId={selectedSighting?.userId}
            img={selectedSighting?.image}
            location={selectedSighting?.lastKnownLocation.address}
            email={selectedSighting?.email}
            phoneNumber={selectedSighting?.phoneNumber}
            createdAt={selectedSighting?.createdAt}
            onDelete={deleteSighting}
            isCardOpen={open}
            setIsCardOpen={setOpen}
          />
          <ToastNotification
            open={toastOpen}
            severity={toastSeverity}
            message={toastMessage}
            handleClose={handleToastClose}
          />
        </>
      )}
    </>
  );
};

export default MapView;
