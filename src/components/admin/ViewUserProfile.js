import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import { Form } from "react-bootstrap";
import "../../css/UserProfile.css";
import { useParams } from "react-router";
import apiService from "../../services/apiService";
import AdminMenu from "../AdminMenu";

export default function ViewUserProfile() {
  // Get id of viewed user
  const { id } = useParams();
  const [user, setUser] = useState(null);

  async function getSpecificUser() {
    try {
      const res = await apiService.getUserById(id);
      setUser(res);
    } catch (err) {
      console.log({ server_error: err.message });
    }
  }
  useEffect(() => {
    getSpecificUser();
  }, []);

  return (
    <div>
      {user !== null ? (
        <>
          <AdminMenu />
          <div className="formDiv">
            <Form>
              <h4 className="text-center">User Information</h4>
              <br />
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  disabled={true}
                  value={user.user.name}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  disabled={true}
                  value={user.user.email}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  disabled={true}
                  value={user.user.phone}
                />
              </Form.Group>
            </Form>
          </div>
          <Footer />
        </>
      ) : null}
    </div>
  );
}
