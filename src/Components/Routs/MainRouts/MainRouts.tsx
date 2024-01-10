import "./MainRouts.css";
import { Route, Routes } from "react-router-dom";
import Photos from "../../pages/Photos/Photos";
import Page404 from "../../pages/Page404/Page404";
import AddCategory from "../../pages/AddCategory/AddCategory";
import AddPhoto from "../../pages/AddPhoto/AddPhoto";
import Explore from "../../pages/Explore/Explore";
import About from "../../pages/about/about";

function MainRoutes(): JSX.Element {
  return (
    <div className="MainRoutes">
      <Routes>
        <Route path="/" element={<Photos />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/cat/:categoryName" element={<Photos />} />
        <Route path="/addPhoto" element={<AddPhoto />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;
