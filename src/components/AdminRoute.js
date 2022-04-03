import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function AdminRoute({ children }) {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  return currentUser.role === "Admin" ? (
    children
  ) : (
    <div className="w-50 m-auto border text-center mt-5">
      <h1 className="text-danger">Error: 401</h1>
      <h4 className="text-danger">Access denied due to invalid credentials</h4>
      <h5
        className="text-info"
        onClick={() => {
          navigate("/");
        }}
      >
        Return to home page
      </h5>
    </div>
  );
}

export default AdminRoute;
