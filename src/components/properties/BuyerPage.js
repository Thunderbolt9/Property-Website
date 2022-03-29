import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Pagination,
  Card,
  Button,
  Row,
  Col,
  Form,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BuyerPage() {
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
      <Container className="display-flex">
        <h3 className="text-center">All Properties</h3>
        <div>
          <Row>
            <Form>
              <Form.Group className="mb-5 mx-5" controlId="SelectDropdown">
                <Row className="mt-2 ">
                  <Col md>
                    <Form.Label htmlFor=""></Form.Label>
                    <Form.Select id="Select">
                      <option>SelectType</option>
                    </Form.Select>
                  </Col>
                  <Col md>
                    <Form.Label htmlFor=""></Form.Label>
                    <Form.Select id="Select">
                      <option>SelectType</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          {/* </Container> */}
        </div>

        <Row className="g-4">
          {currentPosts.map((post) => (
            <Col md={6} key={post.id}>
              <Card style={{ width: "18rem", margin: "2rem 20rem 2em 16rem" }}>
                <Card.Img variant="top" src={post.url} />

                <Card.ImgOverlay style={{ margin: "7em" }}>
                  <Button variant="primary">Click</Button>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>

        <Pagination style={{ justifyContent: "center" }}>
          {pageNumbers.map((number) => {
            return (
              <Pagination.Item onClick={() => paginate(number)}>
                {number}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </Container>
    </>
  );
}

export default BuyerPage;
