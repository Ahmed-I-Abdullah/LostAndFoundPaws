import React, { useState } from "react";
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
import { useMobile } from "../../MobileContext";
import CustomDropdown from "../DropDown/DropDown";
import "./SideBar.css";
import theme from "../../theme/theme";

const SideBar = ({ selectedView, onClose }) => {
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
  const { isMobile } = useMobile();

  //TODO: Add functionality to all filters

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

      {!isMobile && (
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

      <div className="divider" />
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

      <div className="divider" />
      <div>
        <Typography variant="h6">Gender</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={gender.male}
              onChange={(e) => setGender({ ...gender, male: e.target.checked })}
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

      <div className="divider" />
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
