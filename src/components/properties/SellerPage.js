import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Spinner } from "react-bootstrap";
import apiService from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import "../../css/SellerPage.css";
import Menu from "../Menu";
import Footer from "../Footer";

function SellerPage() {
  const initialValues = {
    name: "",
    address_line_one: "",
    address_line_two: "",
    city: "",
    zipcode: "",
    fileOne: null,
    fileTwo: null,
    fileThree: null,
    carpetArea: "",
    buildupArea: "",
    price: "",
    description: "",
    apartmentType: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSpinner, setSpinner] = useState(false);
  const [serverError, setServerError] = useState({});

  const fileone = React.createRef();
  const filetwo = React.createRef();
  const filethree = React.createRef();

  const navigate = useNavigate();

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
      async function createProperty() {
        try {
          setSpinner(true);
          const res = await apiService.createProperty(formValues);
          console.log(res);
          navigate("/propertyviewpage");
        } catch (err) {
          setServerError({ server_error: err.message });
          setSpinner(false);
          setIsSubmit(false);
        }
      }
      createProperty();
    }
    // update only when there is change in formerrors
  }, [formErrors, formValues, isSubmit, navigate]);

  const handleFile = (refname) => {
    if (refname === "fileone") {
      fileone.current.click();
    } else if (refname === "filetwo") {
      filetwo.current.click();
    } else if (refname === "filethree") {
      filethree.current.click();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fileOne" || name === "fileTwo" || name === "fileThree") {
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
    setServerError(false);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Property name is required!*";
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
    if (!values.apartmentType) {
      errors.apartmentType = "Apartment type is required!*";
    }
    if (!values.fileOne || !values.fileTwo || !values.fileThree) {
      errors.fileOne = "You must upload all three images!*";
    }
    if (!values.carpetArea) {
      errors.carpetArea = "Carpet area is required!*";
    }
    if (!values.buildupArea) {
      errors.buildupArea = "buildup area is required!*";
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
    <>
      <Menu />
      <div className="sell-form-container">
        <Form onSubmit={handleSubmit} className="sell-form shadow-sm form-bg">
          <h3 className="text-center">Sell Property</h3>
          <Form.Group>
            <Form.Label>Property Name</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              name="name"
              placeholder="Property Name"
              value={formValues.name}
              onChange={handleChange}
              isInvalid={formErrors.name ? true : false}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.name}
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
              isInvalid={formErrors.apartmentType ? true : false}
            ></Form.Control>
            <Form.Check
              inline
              label="1 BHK"
              name="apartmentType"
              value="1 BHK"
              onChange={handleChange}
              type="radio"
              id={`inline-$radio-1`}
            />
            <Form.Check
              inline
              label="2 BHK"
              name="apartmentType"
              value="2 BHK"
              onChange={handleChange}
              type="radio"
              id={`inline-$radio-2`}
            />
            <Form.Check
              inline
              label="3 BHK"
              name="apartmentType"
              value="3 BHK"
              onChange={handleChange}
              type="radio"
              id={`inline-$radio-2`}
            />
            <Form.Check
              inline
              label="4 BHK"
              name="apartmentType"
              value="4 BHK"
              onChange={handleChange}
              type="radio"
              id={`inline-$radio-2`}
            />
            <Form.Check
              inline
              label="Villa"
              name="apartmentType"
              value="Villa"
              onChange={handleChange}
              type="radio"
              id={`inline-$radio-2`}
            />
            <Form.Check
              inline
              label="Other"
              name="apartmentType"
              value="Other"
              onChange={handleChange}
              type="radio"
              id={`inline-$radio-2`}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.apartmentType}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-lg" style={{ cursor: "pointer" }}>
            <Form.Label>Upload Images</Form.Label>
            <Form.Control
              hidden
              isInvalid={formErrors.fileOne ? true : false}
            ></Form.Control>
            <Row className="vertical-spacing">
              <Col xs={12} md={4}>
                <img
                  src={
                    formValues.fileOne
                      ? window.URL.createObjectURL(formValues.fileOne)
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
                  name="fileOne"
                  hidden
                />
              </Col>
              <Col xs={12} md={4}>
                <img
                  src={
                    formValues.fileTwo
                      ? window.URL.createObjectURL(formValues.fileTwo)
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
                  name="fileTwo"
                  hidden
                />
              </Col>
              <Col xs={12} md={4}>
                <img
                  src={
                    formValues.fileThree
                      ? window.URL.createObjectURL(formValues.fileThree)
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
                  name="fileThree"
                  hidden
                />
              </Col>
            </Row>
            <Form.Control.Feedback type="invalid">
              {formErrors.fileOne}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-lg">
            <Form.Label>Carpet area</Form.Label>
            <Form.Control
              type="number"
              size="lg"
              name="carpetArea"
              placeholder="Carpet Area"
              value={formValues.carpetArea}
              onChange={handleChange}
              isInvalid={formErrors.carpetArea ? true : false}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.carpetArea}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="input-lg">
                <Form.Label>Buildup area</Form.Label>
                <Form.Control
                  type="number"
                  size="lg"
                  name="buildupArea"
                  placeholder="Buildup Area"
                  value={formValues.buildupArea}
                  onChange={handleChange}
                  isInvalid={formErrors.buildupArea ? true : false}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.buildupArea}
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

          <div className="text-danger">{serverError.server_error}</div>

          {showSpinner ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            ""
          )}

          <div className="text-center">
            <Button type="submit" size="lg" className="submitSellButton">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default SellerPage;
