import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import "./ViewPostPage.css";
import pet1Image from "../../assets/images/pet1.png";
import pet2Image from "../../assets/images/pet2.png";
import pet3Image from "../../assets/images/pet3.png";
import StatusLabel from "../../components/StatusLabel/StatusLabel";
import FlagIcon from "@mui/icons-material/Flag";
import theme from "../../theme/theme";
import Comments from "../../components/Comments/Comments";
import MapWithPin from "../../components/MapWithPin/MapWithPin";
import { v4 as uuidv4 } from "uuid";

const petName = "Nala";
const label = "LOST";
const datePosted = "March 20, 2024";
const dateUpdated = "March 22, 2024";
const summary = "Brief summary explaining the case";
const gender = "M";
const species = "Cat";
const description = "Detailed description about the pet";
const lastKnownLocation = { latitude: 51, longitude: 114 };
const contactInfo = {
  email: "joe.smith@email.com",
  phone: "+1 (431) 972 9107",
  username: "Joe Smith",
};

const SectionTitle = ({ title }) => {
  return (
    <Typography variant="h4" fontWeight="bold">
      {title}
    </Typography>
  );
};

const ViewPostPage = () => {
  const theme = useTheme();
  const extraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const [goToSlide, setGoToSlide] = useState(0);
  const [offsetRadius] = useState(4);
  const handleSlideChange = (forward) => {
    if (forward) {
      if (goToSlide === slides.length - 1) {
        setGoToSlide(0);
      } else {
        setGoToSlide((prevState) => prevState + 1);
      }
    } else {
      if (goToSlide === 0) {
        setGoToSlide(slides.length - 1);
      } else {
        setGoToSlide((prevState) => prevState - 1);
      }
    }
  };

  const slides = [
    {
      key: uuidv4(),
      content: <img className="pet-image" src={pet1Image} />,
    },
    {
      key: uuidv4(),
      content: <img className="pet-image" src={pet2Image} />,
    },
    {
      key: uuidv4(),
      content: <img className="pet-image" src={pet3Image} />,
    },
  ].map((slide, index) => {
    return { ...slide, onClick: () => setGoToSlide(index) };
  });

  const handleForwardSlideChange = () => {
    if (goToSlide === slides.length - 1) {
      setGoToSlide(0);
    } else {
      setGoToSlide((prevState) => prevState + 1);
    }
  };

  const handleBackwardSlideChange = () => {
    if (goToSlide === 0) {
      setGoToSlide(slides.length - 1);
    } else {
      setGoToSlide((prevState) => prevState - 1);
    }
  };

  const comments = () => {
    return (
      <>
      <Grid item container xs={12}>
        <SectionTitle title="Comments" />
        {/* <Comments /> */}
        </Grid>
      </>
    );
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Grid container spacing={10}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h1" sx={{ fontWeight: "bold" }}>
              {petName}
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button
              size={small ? "small" : "medium"}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.custom.greyBkg.tag,
                borderRadius: 2,
                color: "#000",
              }}
              startIcon={<FlagIcon />}
            >
              Report
            </Button>
          </Grid>

          <Grid item xs={12}>
            <StatusLabel status={label} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="#979797">
              Posted: {datePosted} - Updated: {dateUpdated}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={15}>
          <Grid container item xs={12} md={8}>
            <Grid item xs={12}>
              <div
                className="carousel-container"
                style={{
                  height: extraSmall ? "100px" : small ? "250px" : "400px",
                }}
              >
                <Carousel
                  slides={slides}
                  goToSlide={goToSlide}
                  offsetRadius={offsetRadius}
                  showNavigation={false}
                  animationConfig={config.gentle}
                />
                <div className="carousel-dots">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.key}
                      className={`dot ${goToSlide === index ? "active" : ""}`}
                      onClick={() => handleSlideChange(index)}
                    />
                  ))}
                </div>
                <div className="left-arrow-container">
                  <IconButton
                    className="left-arrow"
                    style={{ backgroundColor: "#FFFFFF" }}
                    onClick={handleBackwardSlideChange}
                  >
                    <ChevronLeft fontSize="large" />
                  </IconButton>
                </div>

                <div className="right-arrow-container">
                  <IconButton
                    style={{ backgroundColor: "#FFFFFF" }}
                    onClick={handleForwardSlideChange}
                  >
                    <ChevronRight fontSize="large" />
                  </IconButton>
                </div>
              </div>
            </Grid>

            {!medium && (
              // <Grid item xs={12}>
              <>
                {comments()}
                </>
              // </Grid>
            )}
          </Grid>

          <Grid container item xs={12} md={4} spacing={2}>
            <Grid item xs={12}>
              <SectionTitle title="Summary" />
              <Typography variant="body2">{summary}</Typography>
            </Grid>

            <Grid item xs={12}>
              <SectionTitle title="Description" />
              <Typography variant="body2">
                <span className="span-key">Gender:</span> {gender}
              </Typography>
              <Typography variant="body2">
                <span className="span-key">Species:</span> {species}
              </Typography>
              <Typography variant="body2">
                <span className="span-key">Description:</span> {description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SectionTitle title="Last Known Location" />
              <MapWithPin longitude={lastKnownLocation.longitude} latitude={lastKnownLocation.latitude} />
            </Grid>

            <Grid item xs={12}>
              <SectionTitle title="Poster's Contact Info" />
              <Typography variant="body2">
                <span className="span-key">Email:</span> {contactInfo.email}
              </Typography>
              <Typography variant="body2">
                <span className="span-key">Phone:</span> {contactInfo.phone}
              </Typography>
              <Typography variant="body2">
                <span className="span-key">Username:</span>{" "}
                {contactInfo.username}
              </Typography>
            </Grid>

            {medium && (
              <Grid item xs={12}>
                {comments()}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewPostPage;
