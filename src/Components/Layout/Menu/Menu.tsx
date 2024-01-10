import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import { useState } from "react";
import React from "react";
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import { store } from "../../redux/Store";

export function Menu({
  open,
  handleDrawerToggle,
}: {
  open: boolean;
  handleDrawerToggle: () => void;
}): JSX.Element {
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState(false);

  const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) =>
        `${props.className} ${isActive ? props.activeClassName : ""}`
      }
    >
      {props.children}
    </NavLink>
  ));

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };
  return (
    <Drawer variant="temporary" open={open} onClose={handleDrawerToggle}>
      <div className="Menu">
        <h2>Main Menu</h2>
        <Divider />
        <List>
          <ListItem
            component={MyNavLink}
            to="/explore"
            activeClassName="active"
            exact
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search Photos" />
          </ListItem>
          <ListItem component={MyNavLink} to="/" activeClassName="active" exact>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="My Photos" />
          </ListItem>
          <ListItem
            component={MyNavLink}
            to="/addPhoto"
            activeClassName="active"
          >
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Photo" />
          </ListItem>
          <ListItem
            component={MyNavLink}
            to="/addCategory"
            activeClassName="active"
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category Management" />
          </ListItem>
          <ListItem component={MyNavLink} to="/about" activeClassName="active">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About the app" />
          </ListItem>
        </List>
        <Divider />
        <div className="myCategories">
          <List>
            <ListItem onClick={handleCategoriesClick}>
              <ListItemText primary="Categories" />
              {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {store.getState().category.categories.map((item) => (
                  <ListItem key={item.category_id}>
                    <NavLink
                      to={`/cat/${item.name}`}
                      onClick={() => {
                        handleDrawerToggle(); // Close the drawer when a category is clicked
                        navigate(`/cat/${item.name}`);
                      }}
                    >
                      <ListItemText primary={item.name} />
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </div>
      </div>
    </Drawer>
  );
}

export default Menu;
