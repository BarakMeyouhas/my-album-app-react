import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explore.css";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

interface PixelsImage {
  id: number;
  photographer: string;
  photographer_url: string;
  alt: string;
  src: {
    original: string;
    portrait: string;
    small: string;
    tiny: string;
    large: string;
    medium: string;
  };
}

function Explore(): JSX.Element {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [images, setImages] = useState<PixelsImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<PixelsImage | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const fetchData = async (page: number, query?: string) => {
    const apiKey = "OQ9XdBxhpTSqIJb7fvEGfw7uYXnDxrOSiPAooXzMiu8yQyen9aiGou7a";
    const perPage = 80; // Set a large value

    const apiUrl = query
      ? `https://api.pexels.com/v1/search?query=${query}`
      : "https://api.pexels.com/v1/curated";

    const axiosConfig = {
      headers: {
        Authorization: apiKey,
      },
      params: {
        per_page: perPage,
        page: page,
        order_by: "random",
        seed: Math.random(),
      },
    };

    try {
      const response = await axios.get(apiUrl, axiosConfig);
      setImages(response.data.photos);
      console.log("Array of photos:", response.data.photos);
    } catch (error) {
      console.error("Error fetching data from Pixels API:", error);
    }
  };

  //for getting all the images by search value...
  //================================================================
  useEffect(() => {
    fetchData(currentPage, searchValue);
  }, [currentPage, searchValue]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleImageClick = (image: PixelsImage) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddPhoto = () => {
    if (selectedImage) {
      navigate(
        `/addPhoto?params=${encodeURIComponent(selectedImage.src.original)}`
      );
      var imageURL = selectedImage.src.original;
      console.log("image url from explore:" + imageURL);
    }
  };

  const handleSearchClick = () => {
    // Trigger search with the current search value
    fetchData(1, searchValue);
  };

  return (
    <Container
      style={{ overflowY: "auto", maxHeight: "80vh" }}
      className="Image-container"
    >
      <br />
      <Box id="Header" sx={{ mb: 2 }}>
        <Typography variant="h4">Search Photos</Typography>
      </Box>
      <br />
      <Container style={{ maxWidth: "50%" }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "15px",
          }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: "block" }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Enter photo topic..."
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default" },
                  }}
                  variant="standard"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button sx={{ mr: "5px" }} variant="contained" onClick={handlePrevPage}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextPage}>
          Next
        </Button>
      </div>
      <div className="Explore">
        <Container maxWidth="xl">
          <ImageList cols={isSmallScreen ? 2 : 3} gap={12}>
            {" "}
            {images.map((item) => (
              <ImageListItem
                key={item.id}
                onClick={() => handleImageClick(item)}
                sx={{
                  "&:hover .MuiImageListItemBar-root": {
                    visibility: "visible",
                    opacity: 1,
                  },
                  cursor: "pointer", // Add cursor pointer for indicating it's clickable
                }}
              >
                <img
                  srcSet={`${item.src.original}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.src.original}?w=248&fit=crop&auto=format`}
                  alt={item.alt}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.alt}
                  subtitle={item.photographer}
                  sx={{
                    visibility: "hidden",
                    opacity: 0,
                    transition: "visibility 0s, opacity 0.2s linear",
                  }}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.photographer}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button sx={{ mr: "5px" }} variant="contained" onClick={handlePrevPage}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextPage}>
          Next
        </Button>
      </div>

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Image Details</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
            width: "auto",
          }}
        >
          {" "}
          {selectedImage && (
            <Paper>
              <img
                src={selectedImage.src.original}
                alt={selectedImage.alt}
                style={{
                  maxWidth: isSmallScreen ? "100%" : "350px",
                  maxHeight: isSmallScreen ? "auto" : "550px",
                  width: "100%",
                  height: "auto",
                }}
              />
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={handleAddPhoto}>Add Photo</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Explore;
