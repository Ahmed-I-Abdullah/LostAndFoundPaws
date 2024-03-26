import CoolImage from "../../sharedStyles/CoolImage.png";
import React, { useState } from "react";
import ReportPopup from "../../components/ReportPopup/ReportPopup";
{
  /* REMOVE THIS REPORT BUTTON, JUST FOR DEMO */
}
import theme from "../../theme/theme";
import { Box, Button, Grid, Typography } from "@mui/material";
import Toggle from "../../components/Toggle/Toggle";
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
    icon: <ListIcon />,
    label: "List View",
    color: theme.palette.custom.selectedCategory.view,
  },
  {
    icon: <MapIcon />,
    label: "Map View",
    color: theme.palette.custom.selectedCategory.view,
  },
];

const HomePageTemp = () => {
  const { isMobile } = useMobile();

  const handleReport = (reason, description) => {
    console.log(
      "Report submitted with reason: ",
      reason,
      " and description: ",
      description
    );
    // Here you would typically handle the report,
    // e.g., sending it to a server or an API endpoint.
  };
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
      <Box sx={{ margin: "1rem" }}>
        {isMobile ? (
          <Grid container item xs={12} justifyContent="space-between">
            <Grid item xs={4} md={3}>
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
              }}
            >
              <TuneIcon />
              <Typography>All Filters</Typography>
            </Button>
            <Box
              width={"100%"}
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
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
        ) : (
          <Grid container item xs={12} justifyContent="space-between">
            <Grid item xs={4} md={3}>
              <Toggle
                options={viewOptions}
                onToggleCallback={handleViewToggle}
                containerWidth={"100%"}
              />
            </Grid>
            <Grid item xs={7} md={6}>
              <Toggle
                options={postTypeOptions}
                onToggleCallback={handlePostTypeToggle}
                containerWidth={"100%"}
              />
            </Grid>
          </Grid>
        )}
        {
          selectedView === "List View" ? (
            <ListView selectedType={selectedType} />
          ) : (
            <></>
          ) //Map View goes here
        }
      </Box>
    </div>
  );
};

export default HomePageTemp;
