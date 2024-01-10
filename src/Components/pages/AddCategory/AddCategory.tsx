import {
  Box,
  Button,
  ButtonGroup,
  Container,
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Category } from "../../Modal/Category";
import { useNavigate } from "react-router-dom";
import { store } from "../../redux/Store";
import {
  addCategoryAction,
  deleteCategoryAction,
  downloadCategoriesAction,
  updateCategoryAction,
} from "../../redux/CategoriesReducer";
import axios from "axios";

function AddCategory(): JSX.Element {
  const [newCategory, setCategory] = useState("");
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (store.getState().category.categories.length < 1) {
      axios
        .get("https://my-album-app-database-d2b58fb12c7d.herokuapp.com/api/v1/album/catList")
        .then((response) => response.data)
        .then((data) => store.dispatch(downloadCategoriesAction(data)));
    }
  }, [refresh]);

  const handleAddButton = async () => {
    try {
      const response = await axios.post(
        "https://my-album-app-database-d2b58fb12c7d.herokuapp.com/api/v1/album/addCat",
        {
          name: newCategory,
        }
      );
      const result: Category = response.data;
      store.dispatch(addCategoryAction(result));
      const updatedResponse = await axios.get(
        "https://my-album-app-database-d2b58fb12c7d.herokuapp.com/api/v1/album/catList"
      );
      const updatedData = updatedResponse.data;
      store.dispatch(downloadCategoriesAction(updatedData));
      setCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
    setRefresh(true);
  };

  const handleEditCategorySubmit = async () => {
    try {
      if (editItemId === null) {
        console.error("editItemId is null");
        return;
      }

      const updatedCategory = {
        category_id: editItemId,
        name: editCategoryName,
      };

      await axios.put(
        `https://my-album-app-database-d2b58fb12c7d.herokuapp.com/api/v1/album/updateCat/${editItemId}`,
        updatedCategory
      );
      store.dispatch(updateCategoryAction(updatedCategory));
      setRefresh(true);
      handleEditModalClose();
    } catch (error) {
      console.error(`Error updating category with id ${editItemId}:`, error);
    }
  };

  const handleOpenEditModal = (categoryId: number, categoryName: string) => {
    setEditItemId(categoryId);
    setEditCategoryName(categoryName);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditItemId(null);
    setEditCategoryName("");
    setEditModalOpen(false);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(
        `https://my-album-app-database-d2b58fb12c7d.herokuapp.com/api/v1/album/deleteCatById/${categoryId}`
      );

      store.dispatch(deleteCategoryAction(categoryId));
      setRefresh((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.error(`Error deleting category with id ${categoryId}:`, error);
    } finally {
      handleClose();
    }
  };

  const handleOpen = (categoryId: number) => {
    setDeleteItemId(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteItemId(null);
    setOpen(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      className="AddCategory"
    >
      <Box
        className="Box"
        id="addCategory"
        sx={{ border: "none", maxWidth: "50%", justifyContent: "center", margin:"0 auto"}}
      >
        <Typography variant="h4" className="Headline">
          Add Category
        </Typography>
        <hr />
        <TextField
          label="Category name"
          variant="outlined"
          style={{ marginTop: 20 }}
          onKeyUp={(args) => {
            setCategory((args.target as HTMLInputElement).value);
          }}
        />
        <br />
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          className="myButtons"
        >
          <Button color="primary" onClick={handleAddButton}>
            Add
          </Button>
        </ButtonGroup>
      </Box>

      <Box className="Box" sx={{ border: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.getState().category.categories.map((item) => (
              <TableRow key={item.category_id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleOpenEditModal(item.category_id, item.name)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleOpen(item.category_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose} style={{ color: "#555555" }}>
            Cancel
          </Button>
          <Button
            onClick={handleEditCategorySubmit}
            style={{ color: "#ffffff", backgroundColor: "#4caf50" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to delete this category?
        </DialogTitle>
        <DialogContent>{}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#555555" }}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              deleteItemId !== null && handleDeleteCategory(deleteItemId)
            }
            style={{ color: "#ffffff", backgroundColor: "#e57373" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AddCategory;
