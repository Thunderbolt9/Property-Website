import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Home from "./components/properties/Home";
import Login from "./components/user/Login";
import RentPage from "./components/properties/RentPage";
import Register from "./components/user/Register";
import BuyerPage from "./components/properties/BuyerPage";
import SellerPage from "./components/properties/SellerPage";
import ContactedProperties from "./components/properties/ContactedProperty";
import ProposedProperties from "./components/properties/ProposedPropertyPage";
import PropertyViewPage from "./components/properties/PropertyViewPage";

import AdminPropertyPage from "./components/admin/AdminPropertyPage";
import AdminUserPage from "./components/admin/AdminUserPage";
import PrivateRoute from "./components/PrivateRoute";
import { API_URL } from "./config";
import axios from "axios";
import store from "./redux/store";
import EditPropertyPage from "./components/properties/EditPropertyPage";

export const AuthContext = React.createContext();

function App() {
  const [currentUser, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    //on page refresh fetch user store i in redux state
    async function refreshUser() {
      try {
        const res = await axios.get(`${API_URL}/user/current_user`, {
          withCredentials: true,
        });
        store.dispatch({
          type: "userAdded",
          payload: {
            user: res.data.user,
          },
        });
      } catch (err) {
        console.log(err);
      }
      setloading(false);
    }
    refreshUser();
  }, []);

  //look for changes in user nd update state accordingly
  useEffect(() => {
    store.subscribe(() => {
      console.log("store updated", store.getState());
      const obj = store.getState();
      setUser(obj.user);
    });
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      {loading ? (
        <div className="spinner">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/buyerpage" element={<BuyerPage />} />
            <Route
              exact
              path="/sellerpage"
              element={
                <PrivateRoute>
                  <SellerPage />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/contactedproperties"
              element={<ContactedProperties />}
            />
            <Route
              exact
              path="/proposedproperties"
              element={<ProposedProperties />}
            />
            <Route
              exact
              path="/propertyviewpage/:id"
              element={<PropertyViewPage />}
            />
            <Route
              exact
              path="/editpropertypage/:id"
              element={<EditPropertyPage />}
            />
            <Route exact path="/adminuserpage" element={<AdminUserPage />} />
            <Route exact path="/adminpropertypage" element={<AdminPropertyPage />} />
            <Route exact path="/rentpage" element={<RentPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </AuthContext.Provider>

  );
}

export default App;
