//IMPORTS----->
import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Menu";
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
import Footer from "../Footer";
import "../../css/Buyerpage.css";


//MAIN FUNCTION----->
function BuyerPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(500);

  //HOOKS ------->
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  //DISPLAYING CURRRENT POSTS----->

  const LastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = LastPostIndex - postsPerPage;
  const currentPosts = posts.slice(FirstPostIndex, LastPostIndex);

  //PAGINATION CODE------>
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Menu />
      <Container className="display-flex">
        <h3 className="text-center">All Properties</h3>
        <div>
          <Row>
            <div classname="form">
              <Form>
                <Form.Group className="mb-5 mx-5" controlId="SelectDropdown">
                  <Row className="mt-2 ">
                    <Col md>
                      <Form.Label htmlFor=""></Form.Label>
                      <Form.Select id="Select">
                        <option>Select Flat Type</option>
                        <option>1 BHK</option>
                        <option>2 BHK</option>
                        <option>3 BHK</option>
                        <option>4 BHK</option>
                        <option>Villa</option>
                        <option>Other</option>
                      </Form.Select>
                    </Col>
                    <Col md>
                      <Form.Label htmlFor=""></Form.Label>
                      <Form.Select id="Select">
                        <option>Select City</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </div>
          </Row>
          {/* </Container> */}
        </div>
        <div classname="card">
          <Row className="g-4">
            {currentPosts.map((post) => (
              <Col md={6} key={post.id}>
                <Card>
                  <Card.Img variant="top" src={post.url} />

                  <Card.ImgOverlay className="img-overlay">
                    <Button className="img-button">Palazo</Button>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <Pagination className="page">
          {pageNumbers.map((number) => {
            return (
              <Pagination.Item onClick={() => paginate(number)}>
                {number}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </Container>
      <Footer />
    </>
  );

}

export default BuyerPage;
