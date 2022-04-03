import React, { useEffect, useState, useContext } from "react";
import "../../css/PropertyViewPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import apiService from "../../services/apiService";

function PropertyViewPage() {
  const user = useContext(AuthContext);
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [property, setProperty] = useState({});
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contacterList, setContacter] = useState([]);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleContact = () => {
    try {
      setShow(true);
      async function contactProperty() {
        const res = await apiService.contactProperty(property._id);
        console.log(res);
      }
      if (user) {
        contactProperty();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    async function deleteProp() {
      try {
        const res = await apiService.deleteProperty(property._id);
        console.log(res);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
    deleteProp();
  };

  const handleEdit = () => {
    console.log(property._id);
    navigate(`/editpropertypage/${property._id}`);
  };

  useEffect(() => {
    async function getPropertyById() {
      try {
        const data = await apiService.getPropertyById(id);
        const images = await apiService.getImages(
          data.Property.images,
          "imageUrl"
        );
        const sellerInfo = await apiService.getUserById(data.Property.sellerId);
        const contacterArray = data.Property.contacterIds.map((item) => {
          return item.contacterId;
        });
        const contacters = await apiService.getContactersInfo(contacterArray);
        data.Property.sellerInfo = sellerInfo;
        setImages(images);
        setContacter(contacters);
        setProperty(data.Property);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getPropertyById();
  }, []);

  const buildCards = () => {
    const list = contacterList.map((item) => {
      return (
        <Row>
          <Card>
            <Card.Body>
              <Card.Title>Name: {item.name}</Card.Title>
              <Card.Text>Email: {item.email}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      );
    });
    return list;
  };

  const buildImages = () => {
    let imageItems =
      images.length > 0 &&
      images.map((imageUrl) => {
        return (
          <Carousel.Item key={imageUrl}>
            <img className="d-block w-100" src={imageUrl} alt="First slide" />
            <Carousel.Caption>
              <h3>{property.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      });

    return imageItems;
  };

  if (loading) {
    return <p>...loading</p>;
  } else {
    return (
      <Container className="container-main">
        <Row>
          <Col className="justify-content-between">
            <h3>{property.name}</h3>
          </Col>
          {user !== null && property.sellerId === user._id ? (
            <Col className="d-flex justify-content-end">
              <Button
                onClick={handleEdit}
                className="contact-button"
                variant="outline-primary"
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                className="contact-button"
                variant="outline-primary"
              >
                Delete
              </Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Row>
          <Col>
            <h6>{property.city}</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <Carousel>
              {images ? (
                buildImages()
              ) : (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              )}
            </Carousel>
          </Col>
        </Row>
        <Row className="pt-2 gap-5">
          <Col>
            <Row>
              <Col>
                <h3>Quick Summery</h3>
              </Col>
            </Row>
            <Row className="property-info">
              <Col>
                <table>
                  <tbody>
                    <tr>
                      <td align="left">
                        <span className="quick-summery-heading">Price:</span>
                      </td>
                      <td align="right">{property.price}</td>
                    </tr>
                    <tr>
                      <td align="left">
                        <span className="quick-summery-heading">Type:</span>
                      </td>
                      <td align="right">{property.type}</td>
                    </tr>
                    <tr>
                      <td align="left">
                        <span className="quick-summery-heading">City:</span>
                      </td>
                      <td align="right">{property.city}</td>
                    </tr>
                    <tr>
                      <td align="left">
                        <span className="quick-summery-heading">Area:</span>
                      </td>
                      <td align="right">{property.carea}</td>
                    </tr>
                    <tr>
                      <td align="left">
                        <span className="quick-summery-heading">
                          Buildup Area:
                        </span>
                      </td>
                      <td align="right">{property.barea}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={12} lg={9}>
            <Row>
              <h3>Property Description</h3>
            </Row>
            <Row className="property-info">
              <Col>
                <p>{property.description}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {user === null || user._id !== property.sellerId ? (
          <>
            <Row className="mt-3">
              <Col>
                <h3>Contact Seller</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className="contact-button"
                  variant="outline-primary"
                  size="lg"
                  onClick={handleContact}
                >
                  Contact
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <h3>Contacted By</h3>
            {buildCards()}
          </>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {user ? <h2>Seller Info</h2> : "Please Login to continue"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {user ? (
              <>
                <Row>Seller Name :{property.sellerInfo.name}</Row>
                <Row>Seller PhoneNo: {property.sellerInfo.phone}</Row>
                <Row>Seller Email: {property.sellerInfo.email}</Row>
              </>
            ) : (
              "You need to login fist to see seller info"
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default PropertyViewPage;
