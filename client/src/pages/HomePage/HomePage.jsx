import CoolImage from "../../sharedStyles/CoolImage.png";
import React, { useState } from "react";
import ReportPopup from "../../components/ReportPopup/ReportPopup";
{
  /* REMOVE THIS REPORT BUTTON, JUST FOR DEMO */
}
import theme from "../../theme/theme";
import { Box, Button, Grid, Typography } from "@mui/material";
import Toggle from "../../components/Toggle/Toggle";
import MapView from "../MapView/MapView";
import ListView from "../ListView/ListView";
import MapIcon from "@mui/icons-material/Map";
import ListIcon from "@mui/icons-material/List";
import { useMobile } from "../../MobileContext";
import TuneIcon from "@mui/icons-material/Tune";
import SearchBar from "../../components/SearchBar/SearchBar";

const postTypeOptions = [
  { label: "All", color: theme.palette.custom.selectedCategory.view },
  { label: "Lost", color: theme.palette.custom.selectedCategory.lost.light },
  { label: "Found", color: theme.palette.custom.selectedCategory.found.light },
  { label: "Sighting", color: theme.palette.custom.selectedCategory.sighting },
];

const viewOptions = [
  {
    label: "List View",
    icon: <ListIcon />,
    color: theme.palette.custom.selectedCategory.view,
  },
  {
    label: "Map View",
    icon: <MapIcon />,
    color: theme.palette.custom.selectedCategory.view,
  },
];

const HomePageTemp = () => {
  const { isMobile } = useMobile();

  const [selectedType, setSelectedType] = useState("All");
  const [selectedView, setSelectedView] = useState("List View");

  const handlePostTypeToggle = (index) => {
    setSelectedType(postTypeOptions[index].label);
  };
  const handleViewToggle = (index) => {
    setSelectedView(viewOptions[index].label);
  };

  return (
    <div>
      {isMobile && selectedView === "List View" ? (
        <Grid container item xs={12} justifyContent="space-between" margin={1}>
          <Grid item xs={4} md={3} marginLeft={1}>
            <Toggle
              options={viewOptions.map((option) => ({
                ...option,
                label: null,
              }))}
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
            />
          </Grid>
          <Button
            variant="contained"
            sx={{
              backgroundColor: `${theme.palette.custom.greyBkg.tag}`,
              color: `${theme.palette.text.primary}`,
              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}`,
              },
              height: "30px",
              marginRight: "1rem",
            }}
          >
            <TuneIcon />
            <Typography>All Filters</Typography>
          </Button>
          <Box width={"100%"} sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <SearchBar placeholder={"Enter city, neighborhood, address"} />
          </Box>
          <Grid item xs={10} md={6} margin={"auto"}>
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
            />
          </Grid>
        </Grid>
      ) : !isMobile && selectedView === "List View" ? (
        <Grid container item xs={12} justifyContent="space-between" margin={1}>
          <Grid item xs={4} md={3} marginLeft={1}>
            <Toggle
              options={viewOptions}
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
              initialIndex={0}
            />
          </Grid>
          <Grid item xs={5} md={4} marginRight={3}>
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
            />
          </Grid>
        </Grid>
      ) : isMobile && selectedView === "Map View" ? (
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          style={{ position: "absolute", zIndex: 2 }}
          margin={1}
        >
          <Grid item xs={4} md={3} marginLeft={1}>
            <Toggle
              options={viewOptions.map((option) => ({
                ...option,
                label: null,
              }))}
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
            />
          </Grid>
          <Button
            variant="contained"
            sx={{
              backgroundColor: `${theme.palette.custom.greyBkg.tag}`,
              color: `${theme.palette.text.primary}`,
              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}`,
              },
              height: "30px",
              marginRight: "1rem",
            }}
          >
            <TuneIcon />
            <Typography>All Filters</Typography>
          </Button>
          <Grid item xs={10} md={6} margin={"auto"} marginTop={11}>
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
            />
          </Grid>
        </Grid>
      ) : !isMobile && selectedView === "Map View" ? (
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          style={{ position: "absolute", zIndex: 2 }}
          margin={1}
        >
          <Grid item xs={4} md={3} marginLeft={1}>
            <Toggle
              options={viewOptions}
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
              initialIndex={1}
            />
          </Grid>
          <Grid item xs={5} md={4}>
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
              initialIndex={0}
            />
          </Grid>
          <div />
          <div />
        </Grid>
      ) : null}
      {selectedView === "List View" ? (
        <Box sx={{ margin: "1rem" }}>
          <ListView selectedType={selectedType} />
        </Box>
      ) : (
        <MapView selectedType={selectedType} />
      )}
    </div>
  );
};

export default HomePageTemp;
