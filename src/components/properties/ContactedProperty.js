import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../Menu";
import Footer from "../Footer";
import "../../css/ContactedProperty.css";
import Carousel from "react-bootstrap/Carousel";
import apiService from "../../services/apiService";

function ContactedProperty() {
  const [property, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(500);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchPosts = async () => {
    //   const res = await axios.get(
    //     "https://jsonplaceholder.typicode.com/photos"
    //   );
    //   setProperty(res.data);
    // };
    // fetchPosts();

    async function getContactedProperties() {
      try {
        const data = await apiService.getContactedProperties();
        const images = await apiService.getImages(
          data.Property.images,
          "imageUrl"
        );
        setImages(images);
        setProperty(data.Property);
        console.log(property);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getContactedProperties();
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

  // Get Current Posts

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = property.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(posts);

  // Pagination

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(property.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <>
        <Menu />
        <br />
        <br />
        <h1 className="text-center">Contacted Properties</h1>
        <br />
        <Row xs={1} md={2} className="propertyDiv">
          {currentPosts.map((post) => (
            <Col key={post._id}>
              <Card className="propertyImage">
                {/* <Card.Img variant="top" src={post.url} /> */}
                {images ? buildImages() : ""}
                <div className="text-center">
                  <Card.ImgOverlay className="imgOverlay">
                    <Button
                      variant="outline-primary"
                      size="lg"
                      className="button"
                    >
                      House
                    </Button>
                  </Card.ImgOverlay>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <br />
        <Pagination style={{ justifyContent: "center" }}>
          {pageNumbers.map((number) => {
            return (
              <Pagination.Item onClick={() => paginate(number)} key={number}>
                {number}
              </Pagination.Item>
            );
          })}
        </Pagination>
        <Footer />
      </>
    );
  }
}

export default ContactedProperty;
