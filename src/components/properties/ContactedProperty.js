import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ContactedProperty() {
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
      <h3 className="text-center">Contacted Properties</h3>
      <br/>
      <div style={{ width: '50%', margin: 'auto'}}>
      <Row xs={1} md={2} className="g-4">
        {currentPosts.map((post) => (
          <Col key={post.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={post.url} />

              <Card.ImgOverlay style={{ margin: "6.5rem 5.5rem" }}>
                <Button variant="light" size="lg" style={{ color: '#75A5FF'}}>House</Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
      </div>
      <br/>
      <Pagination style={{ justifyContent: "center" }}>
        {pageNumbers.map((number) => {
          return (
            <Pagination.Item onClick={() => paginate(number)} key={number}>
              {number}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </>
  );
}

export default ContactedProperty;
