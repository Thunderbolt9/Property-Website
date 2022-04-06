import React, { useEffect, useState, useContext } from "react";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import "../../css/UserProfile.css";
import authService from "../../services/authService";
import { useNavigate, useParams } from "react-router";
import AdminMenu from "../AdminMenu";
import apiService from "../../services/apiService";
import { AuthContext } from "../../App";

export default function UpdateUserPage() {
  const { id } = useParams();
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  const [disable, setDisable] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [makeAdmin, setMakeAdmin] = useState(false);
  const [specificUser, setSpecificUser] = useState(null);

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    async function updateUser() {
      const res = await authService.update(formValues);

      if (res.error) {
        setServerError({ server_error: res.error });
      } else {
        if (makeAdmin === true) {
          const res = await apiService.changeRole(id, "Admin");
          navigate("/adminuserpage");
        } else {
          const res = await apiService.changeRole(id, "Normal");
          navigate("/adminuserpage");
        }
      }
    }

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      updateUser();
    }
  }, [isSubmit]);

  useEffect(() => {
    async function getUserById() {
      try {
        const res = await apiService.getUserById(id);
        console.log(res);
        setSpecificUser(res);
        setFormValues({
          id: res.user._id,
          name: res.user.name,
          email: res.user.email,
          phone: res.user.phone,
        });
        setServerError(false);
      } catch (err) {
        setServerError({ server_error: err.message });
      }
    }

    getUserById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setDisable(true);
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\d{10}$/;
    if (!values.name) {
      errors.name = "Name is required!*";
    }
    if (!values.email) {
      errors.email = "Email is required!*";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "Phone is required!*";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "This is not a valid phone format!";
    }
    return errors;
  };

  return (
    <div>
      <AdminMenu />
      {formValues !== null ? (
        <div className="formDiv">
          <Form onSubmit={handleSubmit}>
            <h4 className="text-center">Update User Profile</h4>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                disabled={disable}
                value={formValues.name}
                onChange={handleChange}
                isInvalid={formErrors.name ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                disabled={disable}
                value={formValues.email}
                onChange={handleChange}
                isInvalid={formErrors.email ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                disabled={disable}
                value={formValues.phone}
                onChange={handleChange}
                isInvalid={formErrors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            {/* setMakeAdmin */}
            <Form.Group className="mb-3">
              {specificUser !== null &&
              specificUser.user._id !== currentUser._id ? (
                <>
                  {specificUser.user.role === "Admin" ? (
                    <Form.Check
                      type="checkbox"
                      label="Remove From Admin"
                      disabled={disable}
                      onClick={() => {
                        setMakeAdmin(false);
                      }}
                    />
                  ) : (
                    <Form.Check
                      type="checkbox"
                      label="Make Admin"
                      disabled={disable}
                      onClick={() => {
                        setMakeAdmin(true);
                      }}
                    />
                  )}
                </>
              ) : null}
            </Form.Group>

            <Form.Group className="text-center">
              <Button
                variant="outline-primary"
                className="button"
                onClick={() => setDisable(false)}
              >
                Edit Profile
              </Button>
              <Button
                variant="outline-primary"
                type="submit"
                className="button"
                disabled={disable}
              >
                Save
              </Button>
            </Form.Group>
          </Form>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
