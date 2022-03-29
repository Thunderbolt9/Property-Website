import React, { useState } from "react";
import "./PropertyViewPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

function PropertyViewPage() {
  return (
    <Container className="d-flex flex-column gap-3 pt-3 pb-4">
      <Row>
        <Col>
          <h3 className="p-0 m-0">Quantiphi</h3>
        </Col>
      </Row>
      <Row>
        <Col>Mumbai</Col>
      </Row>
      <Row>
        <Col>
          <Carousel>
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
            <Carousel.Item>
              <img
                className="d-block w-100 "
                src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col>
          <Row>
            <Col>
              <h3>Quick Summery</h3>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <table>
                <tbody>
                  <tr>
                    <td align="left">
                      <h5>Price:</h5>
                    </td>
                    <td align="right">1 crore</td>
                  </tr>
                  <tr>
                    <td align="left">
                      <h5>Location:</h5>
                    </td>
                    <td align="right">Mumbai</td>
                  </tr>
                  <tr>
                    <td align="left">
                      <h5>Type:</h5>
                    </td>
                    <td align="right">Mumbai</td>
                  </tr>
                  <tr>
                    <td align="left">
                      <h5>City:</h5>
                    </td>
                    <td align="right">Mumbai</td>
                  </tr>
                  <tr>
                    <td align="left">
                      <h5>Area:</h5>
                    </td>
                    <td align="right">Mumbai</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Col>
        <Col lg={1} xs={12}>
          <div style={{ height: "15px" }}></div>
        </Col>
        {/*for spacing*/}
        <Col xs={12} md={12} lg={8}>
          <Row>
            <h3>Property Description</h3>
          </Row>
          <Row className="mt-3">
            <Col>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32. The standard chunk of Lorem Ipsum used since
                the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                Cicero are also reproduced in their exact original form,
                accompanied by English versions from the 1914 translation by H.
                Rackham.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Contact Seller</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="outline-primary" size="lg">
            Contact
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyViewPage;
