import React, { useContext, useEffect, useState } from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import "../../css/UserProfile.css";
import { AuthContext } from "../../App";
import updateService from "../../services/authService";
import store from "../../redux/store";

export default function UserProfile({ path }) {
  const [disable, setDisable] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const currentUser = useContext(AuthContext);
  const initialValues = {
    name: currentUser.name,
    phone: currentUser.phone,
  };
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      async function updateUser() {
        const res = await updateService.update(formValues);
        console.log(res.error);
        if (res.error) {
          setServerError({ server_error: res.error });
        } else {
          store.dispatch({
            type: "userAdded",
            payload: {
              user: res.user
            }
          });
      }
    }
      updateUser();
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
    const phoneRegex = /^\d{10}$/;
    if (!values.name) {
      errors.name = "Name is required!*";
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
      <Menu />
      <div className="formDiv">
        <Form onSubmit={handleSubmit}>
          <h4 className="text-center">User Profile</h4>
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
          {path === "/profile" ? (
            ""
          ) : (
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Make Admin" />
            </Form.Group>
          )}

          <Form.Group className="text-center">
            <Button
              variant="outline-primary"
              type="submit"
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
      <Footer />
    </div>
  );
}
