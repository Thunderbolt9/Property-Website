import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../Menu";
import Footer from "../Footer";
import "../../css/ProposedProperty.css";

function ProposedPropertyPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(500);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  // Get Current Posts

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(posts);

  // Pagination

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Menu />
      <br />
      <br />
      <h3 className="text-center">Posted Properties</h3>
      <br />
      <Row xs={1} md={2} className="propertyDiv">
        {currentPosts.map((post) => (
          <Col key={post.id}>
            <Card className="propertyImage">
              <Card.Img variant="top" src={post.url} />
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

export default ProposedPropertyPage;
