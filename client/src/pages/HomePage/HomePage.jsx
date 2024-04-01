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
import SideBar from "../../components/SideBar/SideBar";
import "./HomePage.css";

const HomePageTemp = () => {
  const { isMobile } = useMobile();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("List View");

  const postTypeOptions =
    selectedView === "List View"
      ? [
          {
            label: "Lost",
            color: theme.palette.custom.selectedCategory.lost.light,
          },
          {
            label: "Found",
            color: theme.palette.custom.selectedCategory.found.light,
          },
          {
            label: "Sighting",
            color: theme.palette.custom.selectedCategory.sighting.light,
          },
        ]
      : [
          { label: "All", color: theme.palette.custom.selectedCategory.view },
          {
            label: "Lost",
            color: theme.palette.custom.selectedCategory.lost.light,
          },
          {
            label: "Found",
            color: theme.palette.custom.selectedCategory.found.light,
          },
          {
            label: "Sighting",
            color: theme.palette.custom.selectedCategory.sighting.light,
          },
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

  const [selectedType, setSelectedType] = useState(
    selectedView === "List View" ? "Lost" : "All"
  );
  const initialSelectedIndex = postTypeOptions.findIndex(
    (option) => option.label === selectedType
  );
  const [selectedTypeIndex, setSelectedTypeIndex] =
    useState(initialSelectedIndex);

  const handlePostTypeToggle = (index) => {
    setSelectedType(postTypeOptions[index].label);
    setSelectedTypeIndex(index);
  };
  const handleViewToggle = (index) => {
    setSelectedTypeIndex(0);
    setSelectedView(viewOptions[index].label);
    // const newView = viewOptions[index].label;
    // setSelectedView(newView);
    // console.log("newView: ", newView);

    // if (
    //   newView === "Map View" &&
    //   ["Lost", "Found", "Sighting"].includes(selectedType)
    // ) {
    //   const typeIndex = postTypeOptions.findIndex(
    //     (option) => option.label === selectedType
    //   );
    //   console.log("typeIndex: ", typeIndex);
    //   setSelectedTypeIndex(typeIndex + 1); // Adjust index for "All" option in "Map View"
    //   console.log("selectedTypeIndex: ", typeIndex + 1);
    // } else if (
    //   newView === "List View" &&
    //   ["All", "Lost", "Found", "Sighting"].includes(selectedType)
    // ) {
    //   const typeIndex = postTypeOptions.findIndex(
    //     (option) => option.label === selectedType
    //   );
    //   setSelectedTypeIndex(typeIndex > 0 ? typeIndex - 1 : 0); // Adjust index for absence of "All" option in "List View"
    // }
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
          {!isSideBarOpen && (
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
              onClick={() => setIsSideBarOpen(true)}
            >
              <TuneIcon />
              <Typography>All Filters</Typography>
            </Button>
          )}
          {isSideBarOpen && (
            <SideBar
              selectedView={selectedView}
              onClose={() => setIsSideBarOpen(false)}
            />
          )}
          <Box width={"100%"} sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <SearchBar placeholder={"Enter city, neighborhood, address"} />
          </Box>
          <Grid item xs={10} md={6} margin={"auto"}>
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
              initialIndex={selectedTypeIndex}
            />
          </Grid>
        </Grid>
      ) : !isMobile && selectedView === "List View" ? (
        <Grid
          container
          item
          xs={12}
          style={{ position: "absolute", zIndex: 2 }}
          margin={1}
        >
          <Grid item xs={4} md={3} marginLeft={1}>
            <Toggle
              options={viewOptions}
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
              initialIndex={0}
            />
          </Grid>
          <Grid item xs={5} md={4} marginLeft={"10vw"}>
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
              initialIndex={selectedTypeIndex}
            />
          </Grid>
          {!isSideBarOpen && (
            <Grid item container position="absolute" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: `${theme.palette.custom.greyBkg.tag}`,
                  color: `${theme.palette.text.primary}`,
                  "&:hover": {
                    backgroundColor: `${theme.palette.primary.main}`,
                  },
                  height: "30px",
                  marginRight: "2rem",
                }}
                onClick={() => setIsSideBarOpen(true)}
              >
                <TuneIcon />
                <Typography>All Filters</Typography>
              </Button>
            </Grid>
          )}
          {isSideBarOpen && (
            <SideBar
              selectedView={selectedView}
              onClose={() => setIsSideBarOpen(false)}
            />
          )}
        </Grid>
      ) : isMobile && selectedView === "Map View" ? (
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          style={{ position: "absolute" }}
          margin={1}
        >
          <Grid item xs={4} md={3} marginLeft={1} style={{ zIndex: 2 }}>
            <Toggle
              options={viewOptions.map((option) => ({
                ...option,
                label: null,
              }))}
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
            />
          </Grid>
          {!isSideBarOpen && (
            <Grid style={{ zIndex: 2 }}>
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
                onClick={() => setIsSideBarOpen(true)}
              >
                <TuneIcon />
                <Typography>All Filters</Typography>
              </Button>
            </Grid>
          )}
          {isSideBarOpen && (
            <SideBar
              selectedView={selectedView}
              onClose={() => setIsSideBarOpen(false)}
            />
          )}
          <Grid
            item
            xs={10}
            md={6}
            margin={"auto"}
            marginTop={11}
            style={{ zIndex: 2 }}
          >
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
              initialIndex={selectedTypeIndex}
            />
          </Grid>
        </Grid>
      ) : !isMobile && selectedView === "Map View" ? (
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          style={{ position: "absolute" }}
          margin={1}
        >
          <Grid
            item
            xs={4}
            md={3}
            marginLeft={1}
            marginBottom={1}
            style={{ zIndex: 2 }}
          >
            <Toggle
              options={viewOptions}
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
              initialIndex={1}
            />
          </Grid>
          <Grid item xs={5} md={4} marginRight={60} style={{ zIndex: 2 }}>
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
              initialIndex={selectedTypeIndex}
            />
          </Grid>
          {!isSideBarOpen && (
            <Grid
              item
              container
              xs={12}
              marginTop={3}
              justifyContent="flex-end"
              style={{ zIndex: 2 }}
            >
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
                onClick={() => setIsSideBarOpen(true)}
              >
                <TuneIcon />
                <Typography>All Filters</Typography>
              </Button>
            </Grid>
          )}
          {isSideBarOpen && (
            <SideBar
              selectedView={selectedView}
              onClose={() => setIsSideBarOpen(false)}
            />
          )}
        </Grid>
      ) : null}
      {selectedView === "List View" ? (
        <Box
          className="list-view"
          style={{
            width: isSideBarOpen && !isMobile ? "calc(100vw - 440px)" : "auto",
          }}
        >
          <ListView
            selectedType={selectedType === "All" ? "Lost" : selectedType}
          />
        </Box>
      ) : (
        <MapView selectedType={selectedType} />
      )}
    </div>
  );
};

export default HomePageTemp;
