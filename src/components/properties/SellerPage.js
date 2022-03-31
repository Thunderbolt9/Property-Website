import React, { useState, useEffect } from "react";
import "../../css/SellerPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import store from "../../redux/store";
import axios from "axios";

function SellerPage() {
  const initialValues = {
    property_name: "",
    address_line_one: "",
    address_line_two: "",
    city: "",
    zipcode: "",
    file_one: null,
    file_two: null,
    file_three: null,
    carpet_area: "",
    build_area: "",
    price: "",
    description: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const fileone = React.createRef();
  const filetwo = React.createRef();
  const filethree = React.createRef();

  const styles = {
    image: {
      background: "white",
      width: "100%",
      height: "calc(100vh * 0.4)",
      objectFit: "cover",
    },
  };

  const defaultBackGround =
    "https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png";

  // Form data avaialble here
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const handleFile = (refname) => {
    if (refname === "fileone") {
      fileone.current.click();
    } else if (refname === "filetwo") {
      filetwo.current.click();
    } else if (refname === "filethree") {
      filethree.current.click();
    }
  };

  async function handleLogout() {
    await axios.post(
      "http://localhost:4000/api/v1/user/logout",
      {},
      { withCredentials: true }
    );
    store.dispatch({
      type: "userDeleted",
      payload: {
        user: null,
      },
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file_one" || name === "file_two" || name === "file_three") {
      setFormValues({
        ...formValues,
        [name]: e.target.files[0],
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.property_name) {
      errors.property_name = "Property name is required!*";
    }
    if (!values.address_line_one) {
      errors.address_line_one = "Address is required!*";
    }
    if (!values.address_line_two) {
      errors.address_line_two = "Address is required!*";
    }
    if (!values.city) {
      errors.city = "City is required!*";
    }
    if (!values.zipcode) {
      errors.zipcode = "Zipcode is required!*";
    }
    if (!values.apartment_type) {
      errors.apartment_type = "Apartment type is required!*";
    }
    if (!values.file_one || !values.file_two || !values.file_three) {
      errors.file_one = "You must upload all three images!*";
    }
    if (!values.carpet_area) {
      errors.carpet_area = "Carpet area is required!*";
    }
    if (!values.build_area) {
      errors.build_area = "buildup area is required!*";
    }
    if (!values.price) {
      errors.price = "Price is required!*";
    }
    if (!values.description) {
      errors.description = "Description is required!*";
    }
    return errors;
  };

  return (
    <div className="sell-form-container">
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-4 shadow-sm form-bg p-3"
      >
        <h3 className="text-center">Sell Property</h3>
        <Form.Group>
          <Form.Label>Property Name</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            name="property_name"
            placeholder="Property Name"
            value={formValues.property_name}
            onChange={handleChange}
            isInvalid={formErrors.property_name ? true : false}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formErrors.property_name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="input-lg">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            name="address_line_one"
            placeholder="Address Line 1"
            value={formValues.address_line_one}
            onChange={handleChange}
            isInvalid={formErrors.address_line_one ? true : false}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formErrors.address_line_one}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="input-lg">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            name="address_line_two"
            placeholder="Address Line 2"
            value={formValues.address_line_two}
            onChange={handleChange}
            isInvalid={formErrors.address_line_two ? true : false}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formErrors.address_line_two}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="input-lg">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                name="city"
                placeholder="City"
                value={formValues.city}
                onChange={handleChange}
                isInvalid={formErrors.city ? true : false}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="input-lg">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="number"
                size="lg"
                name="zipcode"
                placeholder="Zipcode"
                value={formValues.zipcode}
                onChange={handleChange}
                isInvalid={formErrors.zipcode ? true : false}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.zipcode}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="input-lg">
          <Form.Label>Select Area</Form.Label>
          <br></br>
          <Form.Control
            hidden
            isInvalid={formErrors.apartment_type ? true : false}
          ></Form.Control>
          <Form.Check
            inline
            label="1 BHK"
            name="apartment_type"
            value="1 BHK"
            onChange={handleChange}
            type="radio"
            id={`inline-$radio-1`}
          />
          <Form.Check
            inline
            label="2 BHK"
            name="apartment_type"
            value="2 BHK"
            onChange={handleChange}
            type="radio"
            id={`inline-$radio-2`}
          />
          <Form.Check
            inline
            label="3 BHK"
            name="apartment_type"
            value="3 BHK"
            onChange={handleChange}
            type="radio"
            id={`inline-$radio-2`}
          />
          <Form.Check
            inline
            label="4 BHK"
            name="apartment_type"
            value="4 BHK"
            onChange={handleChange}
            type="radio"
            id={`inline-$radio-2`}
          />
          <Form.Check
            inline
            label="Villa"
            name="apartment_type"
            value="Villa"
            onChange={handleChange}
            type="radio"
            id={`inline-$radio-2`}
          />
          <Form.Check
            inline
            label="Other"
            name="apartment_type"
            value="Other"
            onChange={handleChange}
            type="radio"
            id={`inline-$radio-2`}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.apartment_type}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="input-lg">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            hidden
            isInvalid={formErrors.file_one ? true : false}
          ></Form.Control>
          <Row className="vertical-spacing">
            <Col xs={12} md={4}>
              <img
                src={
                  formValues.file_one
                    ? window.URL.createObjectURL(formValues.file_one)
                    : defaultBackGround
                }
                alt="images"
                onClick={() => {
                  handleFile("fileone");
                }}
                style={styles.image}
              ></img>
              <input
                onChange={handleChange}
                ref={fileone}
                accept="image/*"
                type="file"
                name="file_one"
                hidden
              />
            </Col>
            <Col xs={12} md={4}>
              <img
                src={
                  formValues.file_two
                    ? window.URL.createObjectURL(formValues.file_two)
                    : defaultBackGround
                }
                alt="images"
                onClick={() => {
                  handleFile("filetwo");
                }}
                style={styles.image}
              ></img>
              <input
                onChange={handleChange}
                ref={filetwo}
                accept="image/*"
                type="file"
                name="file_two"
                hidden
              />
            </Col>
            <Col xs={12} md={4}>
              <img
                src={
                  formValues.file_three
                    ? window.URL.createObjectURL(formValues.file_three)
                    : defaultBackGround
                }
                alt="images"
                onClick={() => {
                  handleFile("filethree");
                }}
                style={styles.image}
              ></img>
              <input
                onChange={handleChange}
                ref={filethree}
                accept="image/*"
                type="file"
                name="file_three"
                hidden
              />
            </Col>
          </Row>
          <Form.Control.Feedback type="invalid">
            {formErrors.file_one}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="input-lg">
          <Form.Label>Carpet area</Form.Label>
          <Form.Control
            type="number"
            size="lg"
            name="carpet_area"
            placeholder="Carpet Area"
            value={formValues.carpet_area}
            onChange={handleChange}
            isInvalid={formErrors.carpet_area ? true : false}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formErrors.carpet_area}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="input-lg">
              <Form.Label>Buildup area</Form.Label>
              <Form.Control
                type="number"
                size="lg"
                name="build_area"
                placeholder="Buildup Area"
                value={formValues.build_area}
                onChange={handleChange}
                isInvalid={formErrors.build_area ? true : false}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.build_area}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="input-lg">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                size="lg"
                name="price"
                placeholder="Price"
                value={formValues.price}
                onChange={handleChange}
                isInvalid={formErrors.price ? true : false}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="input-lg">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            as="textarea"
            rows={9}
            name="description"
            placeholder="Description"
            value={formValues.description}
            onChange={handleChange}
            isInvalid={formErrors.description ? true : false}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formErrors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center">
          <Button
            type="submit"
            variant="outline-primary"
            size="lg"
            className="auth-button"
          >
            Submit
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline-primary"
            size="lg"
            className="auth-button"
          >
            Logout
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SellerPage;
