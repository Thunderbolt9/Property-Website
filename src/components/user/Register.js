import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";

function Register() {
  const initialValues = {
    name: "",
    phoneno: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // Form data avaialble here
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
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
    if (!values.phoneno) {
      errors.phoneno = "Phoneno is required!*";
    } else if (!phoneRegex.test(values.phoneno)) {
      errors.phoneno = "This is not a valid phone format!";
    }
    if (!values.password) {
      errors.password = "Password is required!*";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (values.password !== values.confirm_password) {
      errors.confirm_password = "Password don't match";
    } else if (!values.confirm_password) {
      errors.confirm_password = "Confirmed password required!*";
    }
    return errors;
  };

  return (
    <div className="auth-form-container">
      <Form
        onSubmit={handleSubmit}
        className="p-4 d-flex flex-column gap-3 shadow-sm form-bg"
      >
        <h3 className="text-center">Register</h3>

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
            name="phoneno"
            value={formValues.phoneno}
            onChange={handleChange}
            isInvalid={formErrors.phoneno ? true : false}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formErrors.phoneno}
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
            name="confirm_password"
            value={formValues.confirm_password}
            onChange={handleChange}
            isInvalid={formErrors.confirm_password ? true : false}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formErrors.confirm_password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group className="input-lg">
          <Form.Check
            size="lg"
            type="checkbox"
            label={`I agree to the terms and conditions`}
            id={`checkbox`}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Accept terms and conditions to continue.
          </Form.Control.Feedback>
        </Form.Group> */}

        <div className="text-center">
          <Button
            type="submit"
            variant="outline-primary"
            size="lg"
            className="auth-button"
          >
            Register
          </Button>
        </div>
        <hr className="m-0" />
        <div className="text-center text-muted">
          Already have an account?{" "}
          <span>
            <a href="/login" className="text-decoration-none">
              Login
            </a>
          </span>
        </div>
      </Form>
    </div>
  );
}

export default Register;
