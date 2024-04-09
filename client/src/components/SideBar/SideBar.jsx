import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  Input,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import SearchBar from "../SearchBar/SearchBar";
import { useMobile } from "../../context/MobileContext";
import CustomDropdown from "../DropDown/DropDown";
import "./SideBar.css";
import theme from "../../theme/theme";
// import AddressAutocompleteField from "../AddressAutocompleteField/AddressAutocompleteField";
// import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { useUser } from "../../context/UserContext";
import { generateClient } from "aws-amplify/api";

// TODO: posts flicker when opening the sidebar - LIST VIEW
// TODO: when term does not match posts, it doesnt automatically reload the posts
// TODO: implement the filters with the apply button
// TODO: must reload page to apply filters - MAP VIEW
const SideBar = ({
  selectedView,
  // selectedType,
  filterPosts,
  setFilterPosts,
  filterSightings,
  setFilterSightings,
  searchTerm,
  setSearchTerm,
  tempSearchTerm,
  setTempSearchTerm,
  sortBy,
  setSortBy,
  species,
  setSpecies,
  gender,
  setGender,
  locationAway,
  setLocationAway,
  disableLocationFilter,
  setDisableLocationFilter,
  reportReason,
  setReportReason,
  isReporting,
  onClose,
}) => {
  const { userState } = useUser();
  let client = generateClient({ authMode: "apiKey" });
  if (userState !== "Guest") {
    client = generateClient({ authMode: "userPool" });
  }
  const [userLocation, setUserLocation] = useState(null);
  const [applyClicked, setApplyClicked] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [sightingsData, setSightingsData] = useState([]);
  const { isMobile } = useMobile();
  const asideRef = useRef(null);

  const handleClickOutside = (event) => {
    if (asideRef.current && !asideRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setSpecies("");
    setGender("");
    setLocationAway(1);
    setDisableLocationFilter(true);
    setSortBy("Newest");
  };

  const handleApplyClick = () => {
    // setSearchTerm(tempSearchTerm);
    // setSortBy(sortBy);
    // setSpecies(species);
    // setGender(gender);
    // setLocationAway(locationAway);
    setApplyClicked(true);
  };

  useEffect(() => {
    if (applyClicked) {
      onClose();
      setSearchTerm(tempSearchTerm);
      setSortBy(sortBy);
      setSpecies(species);
      setGender(gender);
      setLocationAway(locationAway);
      setApplyClicked(false);
    }
  }, [applyClicked, searchTerm, tempSearchTerm, onClose]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const calculateDistance = (location1, location2) => {
    if (location1 && location2) {
      const lat1 = location1.latitude;
      const lon1 = location1.longitude;
      const lat2 = location2.latitude;
      const lon2 = location2.longitude;

      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance;
    }
    return null;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listPostsResponse = await client.graphql({
          query: queries.listPosts,
        });
        setPostsData(listPostsResponse.data.listPosts.items);

        const listSightingsResponse = await client.graphql({
          query: queries.listSightings,
        });
        setSightingsData(listSightingsResponse.data.listSightings.items);

        // Filter based on search term
        filterPosts = postsData.filter((item) =>
          item.lastKnownLocation.address
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

        filterSightings = sightingsData.filter((item) =>
          item.location.address.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Filter based on species
        if (species.dog || species.cat || species.other) {
          filterPosts = filterPosts.filter(
            (item) => species[item.species.toLowerCase()]
          );
        }

        // Filter based on gender
        if (gender.male || gender.female || gender.other) {
          filterPosts = filterPosts.filter(
            (item) => gender[item.gender.toLowerCase()]
          );
        }

        // Filter based on location away
        if (!disableLocationFilter) {
          filterPosts = filterPosts.filter(
            (item) =>
              calculateDistance(item.lastKnownLocation, userLocation) <=
              locationAway
          );
          filterSightings = filterSightings.filter(
            (item) =>
              calculateDistance(item.location, userLocation) <= locationAway
          );
        }

        switch (sortBy) {
          case "Newest":
            filterPosts.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            filterSightings.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            break;
          case "Oldest":
            filterPosts.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            filterSightings.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;
          case "Name":
            filterPosts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }

        setFilterPosts(filterPosts);
        setFilterSightings(filterSightings);

        // console.log(postsData);
        // console.log(sightingsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [
    searchTerm,
    filterPosts,
    filterSightings,
    postsData,
    sightingsData,
    species,
    gender,
    locationAway,
    disableLocationFilter,
    sortBy,
    userLocation,
  ]);

  return (
    <>
      <aside className="sidebar" ref={asideRef}>
        <Button
          variant="contained"
          onClick={() => clearFilters()}
          style={{
            backgroundColor: `${theme.palette.custom.greyBkg.tag}`,
            color: "black",
          }}
        >
          Clear Filters
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton color="black" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {!isMobile && !isReporting && (
          <Box width={"100%"} sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Input
              placeholder="Enter city, neighborhood, address"
              value={tempSearchTerm}
              style={{ width: "100%", padding: "10px" }}
              onChange={(e) => {
                setTempSearchTerm(e.target.value);
              }}
            />
          </Box>
        )}

        <Typography variant="h1" sx={{ textAlign: "center" }}>
          Filters
        </Typography>

        {selectedView === "List View" && <div className="divider" />}
        {selectedView === "List View" && (
          <div>
            <Typography variant="h6">Sort By</Typography>
            <CustomDropdown
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              options={[
                { label: "Most Recently Posted", value: "Newest" },
                { label: "Oldest Posted", value: "Oldest" },
                { label: "Name", value: "Name" },
              ]}
            />
          </div>
        )}

        {!isReporting && selectedView === "List View" && (
          <div className="divider" />
        )}
        {!isReporting && selectedView === "List View" && (
          <div>
            <Typography variant="h6">Species</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={species.dog}
                  onChange={(e) =>
                    setSpecies({ ...species, dog: e.target.checked })
                  }
                />
              }
              label="Dog"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={species.cat}
                  onChange={(e) =>
                    setSpecies({ ...species, cat: e.target.checked })
                  }
                />
              }
              label="Cat"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={species.other}
                  onChange={(e) =>
                    setSpecies({ ...species, other: e.target.checked })
                  }
                />
              }
              label="Other"
            />
          </div>
        )}

        {!isReporting && selectedView === "List View" && (
          <div className="divider" />
        )}
        {!isReporting && selectedView === "List View" && (
          <div>
            <Typography variant="h6">Gender</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={gender.male}
                  onChange={(e) =>
                    setGender({ ...gender, male: e.target.checked })
                  }
                />
              }
              label="Male"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={gender.female}
                  onChange={(e) =>
                    setGender({ ...gender, female: e.target.checked })
                  }
                />
              }
              label="Female"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={gender.other}
                  onChange={(e) =>
                    setGender({ ...gender, other: e.target.checked })
                  }
                />
              }
              label="Other"
            />
          </div>
        )}

        {isReporting && <div className="divider" />}
        {isReporting && (
          <div>
            <Typography variant="h6">Report Reason</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={reportReason.inappropriate}
                  onChange={(e) =>
                    setReportReason({
                      ...reportReason,
                      inappropriate: e.target.checked,
                    })
                  }
                />
              }
              label="Inappropriate"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reportReason.spam}
                  onChange={(e) =>
                    setReportReason({
                      ...reportReason,
                      spam: e.target.checked,
                    })
                  }
                />
              }
              label="Spam"
            />
          </div>
        )}

        {!isReporting && <div className="divider" />}
        {!isReporting && (
          <div>
            <Typography variant="h6">Location Away</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={disableLocationFilter}
                  onChange={(e) => setDisableLocationFilter(e.target.checked)}
                />
              }
              label="Disable Location Filter"
            />
            <Slider
              value={locationAway}
              onChange={(e, value) => setLocationAway(value)}
              min={1}
              max={30}
              step={1}
              disabled={disableLocationFilter}
              marks={[
                { value: 1, label: "1 km" },
                { value: 30, label: "30 km" },
              ]}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "90%",
                margin: "auto",
              }}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleApplyClick()}
            style={{
              backgroundColor: "white",
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "12px",
              width: "60%",
            }}
          >
            Apply
          </Button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
