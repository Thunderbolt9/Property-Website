import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/properties/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import BuyerPage from "./components/properties/BuyerPage";
import SellerPage from "./components/properties/SellerPage";
import ContactedProperties from "./components/properties/ContactedProperty";
import ProposedProperties from "./components/properties/ProposedPropertyPage";
import PropertyViewPage from "./components/properties/PropertyViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buyerpage" element={<BuyerPage />} />
        <Route path="/sellerpage" element={<SellerPage />} />
        <Route path="/contactedproperties" element={<ContactedProperties />} />
        <Route path="/proposedproperties" element={<ProposedProperties />} />
        <Route path="/propertyviewpage" element={<PropertyViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
