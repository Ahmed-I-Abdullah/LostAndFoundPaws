import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import theme from "../../theme/theme";
import { Box, Button, Grid, Typography } from "@mui/material";
import Toggle from "../../components/Toggle/Toggle";
import MapView from "../MapView/MapView";
import ListView from "../ListView/ListView";
import MapIcon from "@mui/icons-material/Map";
import ListIcon from "@mui/icons-material/List";
import { useMobile } from "../../context/MobileContext";
import TuneIcon from "@mui/icons-material/Tune";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideBar from "../../components/SideBar/SideBar";
import "./HomePage.css";

const mapPostTypeOptions = [
  { label: "All", color: theme.palette.custom.selectedCategory.view },
  { label: "Lost", color: theme.palette.custom.selectedCategory.lost.light },
  { label: "Found", color: theme.palette.custom.selectedCategory.found.light },
  {
    label: "Sighting",
    color: theme.palette.custom.selectedCategory.sighting.light,
  },
];

const listPostTypeOptions = [
  { label: "Lost", color: theme.palette.custom.selectedCategory.lost.light },
  { label: "Found", color: theme.palette.custom.selectedCategory.found.light },
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

const HomePageTemp = () => {
  const { isMobile } = useMobile();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const location = useLocation();
  const initialSelectedType = location.state?.selectedType || "Lost";

  const [selectedView, setSelectedView] = useState("List View");
  const [selectedType, setSelectedType] = useState(
    selectedView === "List View" ? initialSelectedType : "All"
  );
  const initialIndex =
  initialSelectedType === "Found" ? 1 :
  initialSelectedType === "Sighting" ? 2 :
  0;

  const [postTypeOptions, setPostTypeOptions] = useState(
    selectedView === "List View" ? listPostTypeOptions : mapPostTypeOptions
  );

  const handlePostTypeToggle = (index) => {
    setSelectedType(postTypeOptions[index].label);
  };

  const handleViewToggle = (index) => {
    setSelectedView(viewOptions[index].label);
    setPostTypeOptions(
      viewOptions[index].label === "List View"
        ? listPostTypeOptions
        : mapPostTypeOptions
    );
    setSelectedType(viewOptions[index].label === "List View" ? "Lost" : "All");
  };

  return (
    <div>
      {selectedView === "List View" ? (
        <Grid
          container
          item
          xs={12}
          justifyContent={isSideBarOpen ? "flex-start" : "space-between"}
          width={"95%"}
          margin={"1rem"}
        >
          <Grid item xs={4} md={3} marginLeft={1}>
            <Toggle
              options={
                isMobile
                  ? viewOptions.map((option) => ({
                      ...option,
                      label: null,
                    }))
                  : viewOptions
              }
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
            />
          </Grid>
          {isMobile &&
            (!isSideBarOpen ? (
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
            ) : (
              <SideBar
                selectedView={selectedView}
                onClose={() => setIsSideBarOpen(false)}
              />
            ))}
          {isMobile && (
            <>
              <Box width={"95%"} sx={{ margin: "1rem auto" }}>
                <SearchBar placeholder={"Enter city, neighborhood, address"} />
              </Box>
            </>
          )}
          <Grid
            item
            xs={isMobile ? 10 : 5}
            md={isMobile ? 6 : 4}
            margin={isMobile && "auto"}
            marginLeft={isSideBarOpen ? "10vw" : ""}
          >
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
              initialIndex = {initialIndex}
            />
          </Grid>
          {!isMobile &&
            (!isSideBarOpen ? (
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
            ) : (
              <SideBar
                selectedView={selectedView}
                onClose={() => setIsSideBarOpen(false)}
              />
            ))}
        </Grid>
      ) : selectedView === "Map View" ? (
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          style={{ position: "absolute" }}
          width={"95%"}
          margin={"1rem"}
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
              options={
                isMobile
                  ? viewOptions.map((option) => ({
                      ...option,
                      label: null,
                    }))
                  : viewOptions
              }
              onToggleCallback={handleViewToggle}
              containerWidth={"100%"}
            />
          </Grid>
          {isMobile &&
            (!isSideBarOpen ? (
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
            ) : (
              <SideBar
                selectedView={selectedView}
                onClose={() => setIsSideBarOpen(false)}
              />
            ))}
          <Grid
            item
            xs={isMobile ? 10 : 5}
            md={isMobile ? 6 : 4}
            margin={isMobile && "auto"}
            marginTop={isMobile && 14}
            marginRight={isMobile ? 0 : 50}
            style={{
              zIndex: 2,
              position: isMobile && "fixed",
              marginLeft: isMobile && "25px",
              width: "100%",
            }}
          >
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
            />
          </Grid>
          {!isMobile &&
            (!isSideBarOpen ? (
              <Grid
                item
                container
                xs={12}
                justifyContent="flex-end"
                style={{
                  zIndex: 2,
                  position: "fixed",
                  right: 0,
                  marginTop: 40,
                }}
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
            ) : (
              <SideBar
                selectedView={selectedView}
                onClose={() => setIsSideBarOpen(false)}
              />
            ))}
        </Grid>
      ) : null}
      {selectedView === "List View" ? (
        <Box
          className="list-view"
          style={{
            width: isSideBarOpen && !isMobile ? "calc(100vw - 390px)" : "auto",
          }}
        >
          <ListView selectedType={selectedType} />
        </Box>
      ) : (
        <MapView selectedType={selectedType} />
      )}
    </div>
  );
};

export default HomePageTemp;
