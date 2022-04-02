import React, { useEffect, useState } from "react";
import "../../css/PropertyViewPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";

function PropertyViewPage() {
  const { id } = useParams();

  const [property, setProperty] = useState({});
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPropertyById() {
      try {
        const data = await apiService.getPropertyById(id);
        const images = await apiService.getImages(
          data.Property.images,
          "imageUrl"
        );
        setImages(images);
        setProperty(data.Property);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getPropertyById();
  }, []);

  const buildImages = () => {
    let imageItems =
      images.length > 0 &&
      images.map((imageUrl) => {
        return (
          <Carousel.Item>
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
          {/* <Col lg={1} xs={12}>
          <div style={{ height: "15px" }}></div>
        </Col> */}
          {/*for spacing*/}
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
            >
              Contact
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PropertyViewPage;
