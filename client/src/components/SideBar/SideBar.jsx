import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "../SearchBar/SearchBar";
import { useMobile } from "../../context/MobileContext";
import CustomDropdown from "../DropDown/DropDown";
import "./SideBar.css";
import theme from "../../theme/theme";

const SideBar = ({ selectedView, isReporting, onClose }) => {
  const [sortBy, setSortBy] = useState("Newest");
  const [species, setSpecies] = useState({
    dog: false,
    cat: false,
    other: false,
  });
  const [gender, setGender] = useState({
    male: false,
    female: false,
    unknown: false,
  });
  const [locationAway, setLocationAway] = useState(0);
  const [reportReason, setReportReason] = useState({
    inappropriate: false,
    spam: false,
  });
  const { isMobile } = useMobile();
  let data = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listPostsResponse = await client.graphql({
          query: queries.listPosts,
        });
        const postsData = listPostsResponse.data.listPosts.items;

        const listSightingsResponse = await client.graphql({
          query: queries.listSightings,
        });
        const sightingsData = listSightingsResponse.data.listSightings.items;

        // setMarkers([...postsData, ...sightingsData]);
        data = [...postsData, ...sightingsData];
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  });

  // const handleSpeciesChange = (speciesType) => (e) => {
  //   setSpecies({ ...species, [speciesType]: e.target.checked });
  // };

  // console.log(data);

  // useEffect(() => {
  //   const filteredData = data.filter((item) => species[item.species]);
  //   // Set your filtered data
  //   // Assuming you have a `setFilteredData` function
  //   setFilteredData(filteredData);
  // }, [species]);

  return (
    <aside className="sidebar">
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
          <SearchBar placeholder={"Enter city, neighborhood, address"} />
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
            options={[
              { label: "Most Recently Posted", value: "Newest" },
              { label: "Oldest Posted", value: "Oldest" },
              { label: "Name", value: "Name" },
            ]}
          />
        </div>
      )}

      {!isReporting && <div className="divider" />}
      {!isReporting && (
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

      {!isReporting && <div className="divider" />}
      {!isReporting && (
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
                checked={gender.unknown}
                onChange={(e) =>
                  setGender({ ...gender, unknown: e.target.checked })
                }
              />
            }
            label="Unknown"
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
                  setReportReason({ ...reportReason, spam: e.target.checked })
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
          <Slider
            value={locationAway}
            onChange={(e, value) => setLocationAway(value)}
            min={0}
            max={30}
            step={1}
            marks={[
              { value: 0, label: "0 km" },
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
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
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
  );
};

export default SideBar;
