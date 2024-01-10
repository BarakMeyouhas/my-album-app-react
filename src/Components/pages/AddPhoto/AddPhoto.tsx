import { useEffect, useState } from "react";
import { store } from "../../redux/Store";
import "./AddPhoto.css";
import { useForm } from "react-hook-form";
import { Photo } from "../../Modal/Photo";
import { addPhotoAction } from "../../redux/PhotosReducer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";

function AddPhoto(): JSX.Element {
  const [imageURL, setURL] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const imageUrlParam = url.searchParams.get("params");
    if (imageUrlParam) {
      setURL(imageUrlParam);
      console.log("image url: " + imageUrlParam);
    } else {
      console.log("there is no image");
    }
  }, [location]);

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Photo>();

  const send = async (data: Photo) => {
    if (!imageURL) {
      console.error("URL is required");
      return;
    }
    console.log(imageURL);

    try {
      const selectedCategory = store
        .getState()
        .category.categories.find(
          (category) => category.category_id === Number(data.category_id)
        );

      if (!selectedCategory) {
        console.error("Selected category not found.");
        return;
      }

      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      const formattedTime = `${currentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const response = await axios.post(
        "https://my-album-app-database-d2b58fb12c7d.herokuapp.com/api/v1/album/addPhoto",
        {
          URL: imageURL,
          description: data.description,
          category_id: selectedCategory.category_id.toString(),
          date: formattedDate,
          time: formattedTime,
        }
      );

      const addedPhoto: Photo = response.data;
      store.dispatch(addPhotoAction(addedPhoto));
      navigate("/");
      console.log(addedPhoto);
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <br />
      <Box id="Header" sx={{ mb: 2 }}>
        <Typography variant="h4">Add Photo Form</Typography>
      </Box>
      <br />
      <div
        className="AddPhoto"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          className="Box"
          sx={{ mr: 2, border: "none", maxWidth: "70%", margin: "auto" }}
        >
          <form onSubmit={handleSubmit(send)}>
            <Typography variant="h6">Add Photo</Typography>
            <hr />

            <TextField
              id="imageUrl"
              type="text"
              label="Image URL"
              placeholder="Enter image URL"
              {...register("URL")}
              onChange={(e) => setURL(e.target.value)}
              value={imageURL}
              fullWidth
              margin="normal"
            />

            <TextField
              multiline
              rows={3}
              label="Image Description"
              placeholder="Enter image description"
              {...register("description")}
              fullWidth
              margin="normal"
            />

            <select
              required
              {...register("category_id")}
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            >
              <option disabled>Choose Category</option>
              {store.getState().category.categories.map((item) => (
                <option key={item.category_id} value={item.category_id}>
                  {item.name}
                </option>
              ))}
            </select>
            <Typography>{new Date().toDateString()}</Typography>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Add Photo
            </Button>
          </form>
        </Box>

        <Box
          className="Box"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageURL && (
            <div>
              <Typography variant="h6">Image Preview</Typography>
              <img
                src={imageURL}
                alt={imageURL}
                style={{ maxWidth: "100%", maxHeight: "350px" }}
              />
            </div>
          )}
        </Box>
      </div>
    </Container>
  );
}

export default AddPhoto;
