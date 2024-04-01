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
import ReportView from "../ReportView/ReportView";
import { useMobile } from "../../context/MobileContext";
import TuneIcon from "@mui/icons-material/Tune";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideBar from "../../components/SideBar/SideBar";

const postTypeOptions = [
  { label: "Lost", color: theme.palette.custom.selectedCategory.lost.light },
  { label: "Found", color: theme.palette.custom.selectedCategory.found.light },
  { label: "Sighting", color: theme.palette.custom.selectedCategory.sighting },
  { label: "Comments", color: theme.palette.custom.selectedCategory.view },
];

const ViewReportsPage = () => {
  const { isMobile } = useMobile();

  const [selectedType, setSelectedType] = useState("Lost");
  const [selectedView, setSelectedView] = useState("List View");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(true);

  const handlePostTypeToggle = (index) => {
    setSelectedType(postTypeOptions[index].label);
  };

  return (
    <div>
      {isMobile && selectedView === "List View" ? (
        <Grid container item xs={12} justifyContent="space-between" margin={1}>
          <Grid container justifyContent="flex-end">
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
                isReporting={isReporting}
                onClose={() => setIsSideBarOpen(false)}
              />
            )}
          </Grid>
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
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          style={{ position: "absolute", zIndex: 2 }}
          margin={1}
        >
          <Grid item xs={5} md={4} marginLeft={4}>
            <Toggle
              options={postTypeOptions}
              onToggleCallback={handlePostTypeToggle}
              containerWidth={"100%"}
            />
          </Grid>
          <Grid marginRight={4}>
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
                isReporting={isReporting}
                onClose={() => setIsSideBarOpen(false)}
              />
            )}
          </Grid>
        </Grid>
      ) : null}
      {selectedView === "List View" ? (
        <Box
          className="list-view"
          style={{
            width: isSideBarOpen && !isMobile ? "calc(100vw - 430px)" : "auto",
          }}
        >
          <ReportView selectedType={selectedType} />
        </Box>
      ) : (
        <MapView selectedType={selectedType} />
      )}
    </div>
  );
};

export default ViewReportsPage;
