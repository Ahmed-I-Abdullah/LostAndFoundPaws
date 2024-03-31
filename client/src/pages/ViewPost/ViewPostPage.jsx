import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
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
import ReportPost from "../../components/ReportPopup/ReportPopup";
import MapWithPin from "../../components/MapWithPin/MapWithPin";
import { v4 as uuidv4 } from "uuid";
import Comments from "../../components/Comments/Comments";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ActionsMenu from "../../components/ActionsMenu/ActionsMenu";
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { useMobile } from '../../MobileContext';


/* MOCK DATA START */
const petName = "Nala";
const label = "LOST";
const datePosted = "March 20, 2024";
const dateUpdated = "March 22, 2024";
const summary = "Brief summary explaining the case";
const gender = "M";
const species = "Cat";
const description = "Detailed description about the pet";
const lastKnownLocation = { latitude: 51.0745, longitude: -114.1458 };
const contactInfo = {
  email: "joe.smith@email.com",
  phone: "+1 (431) 972 9107",
  username: "Joe Smith",
};
/* MOCK DATA END */

const isAdmin = true;

const SectionTitle = ({ title }) => {
  return (
    <Typography variant="h2" fontWeight="bold" style={{ marginBottom: 4 }}>
      {title}
    </Typography>
  );
};

const ViewPostPage = () => {
  const theme = useTheme();
  const extraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const { isMobile, isMobileSmall } = useMobile();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmResolve, setOpenConfirmResolve] = useState(false);

  const handleDeleteConfirmed = () => {
    onDelete(petData.id);
    setOpenConfirmDelete(false); // Close the dialog
  };

  const handleResolveConfirmed = () => {
    onResolve(petData.id);
    setOpenConfirmResolve(false); // Close the dialog
  };

  const [goToSlide, setGoToSlide] = useState(0);
  const [offsetRadius] = useState(4);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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

  const handleReport = (reason, description) => {
    console.log(
      "Report submitted with reason: ",
      reason,
      " and description: ",
      description
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const comments = () => {
    return (
      <>
        <SectionTitle title="Comments" />
        <Comments />
      </>
    );
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: "20px" }}>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          md={8}
          spacing={1}
          style={
            !medium
              ? { paddingRight: "5%", marginBottom: 20 }
              : { marginBottom: 20 }
          }
        >
          <Grid item xs={2}>
            <Typography variant="h1" sx={{ fontWeight: "bold" }}>
              {petName}
            </Typography>
          </Grid>
          <Grid item xs={10} container justifyContent="flex-end">
            {!isAdmin ? (
              <div>
                <Button
                  size={small ? "small" : "medium"}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.custom.greyBkg.tag,
                    borderRadius: 2,
                    color: "#000",
                    marginRight: "8px",
                  }}
                  startIcon={<FlagIcon />}
                  onClick={() => setIsReportModalOpen(true)}
                >
                  Report
                </Button>
            </div>) : (
              <div> 
                {isMobile ? (<div>
                  <div className="userMenuSection" onClick={handleMenu} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <MoreHorizIcon sx={{ fontSize: '40px' }} />
                  </div>
                  <ActionsMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />

                </div>) : ( <div>
                  <Button
                    size={small ? "small" : "medium"}
                    variant="contained"
                    onClick={() => setOpenConfirmResolve(true)}
                    sx={{
                      backgroundColor: theme.palette.custom.greyBkg.tag,
                      borderRadius: 2,
                      color: "#000",
                      marginRight: '8px'
                    }}
                    startIcon={<CheckIcon />}
                  >
                    Mark as resolved
                  </Button>
                  <Button
                    size={small ? "small" : "medium"}
                    variant="contained"
                    sx={{
                      backgroundColor: theme.palette.custom.greyBkg.tag,
                      borderRadius: 2,
                      color: "#000",
                      marginRight: '8px'
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    size={small ? "small" : "medium"}
                    variant="contained"
                    color="error"
                    onClick={() => setOpenConfirmDelete(true)}
                    sx={{
                      borderRadius: 2,
                      marginRight: '8px'
                    }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </div>)}
            </div>)}
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
        <Grid item container columnSpacing={15}>
          <Grid
            container
            item
            xs={12}
            md={8}
            style={
              !medium
                ? { borderRight: "2px solid black", paddingRight: "6%" }
                : {}
            }
            rowSpacing={3}
          >
            <Grid item xs={12}>
              <div
                className="carousel-container"
                style={{
                  height: extraSmall ? "100px" : small ? "250px" : "400px",
                  marginBottom: medium ? 40 : 0,
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
            <Divider orientation="vertical" flexItem />

            {!medium && (
              <Grid item xs={12}>
                <>{comments()}</>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12} md={4} spacing={medium ? 4 : 0}>
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
              <MapWithPin
                longitude={lastKnownLocation.longitude}
                latitude={lastKnownLocation.latitude}
              />
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
      {isReportModalOpen && (
        <ReportPost
          contentType="post"
          itemId={"post.id"}
          onClose={() => setIsReportModalOpen(false)}
          onReport={handleReport}
        />
      )}
    {/* Use the ConfirmDialog for delete confirmation */}
    <ConfirmDialog
      open={openConfirmDelete}
      onClose={() => setOpenConfirmDelete(false)}
      onConfirm={handleDeleteConfirmed}
      title="Are you sure you want to delete this post?"
    />

    {/* Use the ConfirmDialog for ignore confirmation */}
    <ConfirmDialog
      open={openConfirmResolve}
      onClose={() => setOpenConfirmResolve(false)}
      onConfirm={handleResolveConfirmed}
      title="Are you sure you want to mark this post as resolved?"
    />
    </Container>
  );
};

export default ViewPostPage;
