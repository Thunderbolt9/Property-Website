import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import authService from "../../services/authService";
import { useNavigate, NavLink } from "react-router-dom";

import "../../css/auth.css";
import "../../css/Menu.css";
import Footer from "../Footer";
import AdminMenu from "../AdminMenu";

function CreateNewUser() {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  // Form data avaialble here
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      async function registerUser() {
        const res = await authService.register(formValues);
        if (res.error) {
          setServerError({ server_error: res.error });
          setIsSubmit(false);
        } else {
          navigate("/adminuserpage");
        }
      }
      registerUser();
    }
  }, [formErrors, formValues, isSubmit, navigate]);
  //update only when threre is change in formErrors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  //validate form values
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
      errors.phone = "phone is required!*";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "This is not a valid phone format!";
    }
    if (!values.password) {
      errors.password = "Password is required!*";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (values.password !== values.cpassword) {
      errors.cpassword = "Password don't match";
    } else if (!values.cpassword) {
      errors.cpassword = "Confirmed password required!*";
    }
    return errors;
  };

  return (
    <>
      <AdminMenu />
      <div className="auth-form-container">
        <Form
          onSubmit={handleSubmit}
          className="p-4 d-flex flex-column gap-3 shadow-sm form-bg"
        >
          <h3 className="text-center">Create a new user</h3>

          <Form.Group>
            <Form.Control
              type="text"
              size="lg"
              placeholder="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              isInvalid={formErrors.name ? true : false}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-lg">
            <Form.Control
              type="text"
              size="lg"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              isInvalid={formErrors.email ? true : false}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              size="lg"
              placeholder="Phone No"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              isInvalid={formErrors.phone ? true : false}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-lg">
            <Form.Control
              type="password"
              size="lg"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              isInvalid={formErrors.password ? true : false}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-lg">
            <Form.Control
              type="password"
              size="lg"
              placeholder="Confirm Password"
              name="cpassword"
              value={formValues.cpassword}
              onChange={handleChange}
              isInvalid={formErrors.cpassword ? true : false}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.cpassword}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="text-danger">{serverError.server_error}</div>

          <div className="text-center">
            <Button type="submit" size="lg" className="createUserButton">
              Register
            </Button>
          </div>
          <hr className="m-0" />
          <div className="text-center text-muted">
            Already have an account?{" "}
            <span>
              <NavLink to="/login" className="text-decoration-none">
                Login
              </NavLink>
            </span>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default CreateNewUser;
