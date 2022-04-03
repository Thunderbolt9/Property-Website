import React, { useEffect, useState } from "react";
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
import apiService from "../../services/apiService";
import { useNavigate } from "react-router-dom";

//MAIN FUNCTION----->
function BuyerPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilter] = useState([]);
  const [postsPerPage] = useState(10);

  const navigate = useNavigate();
  const [flatType, setFlatType] = useState();

  // For filteration between flats<------->
  const onChangeFlatType = async (e) => {
    setFlatType(e.target.value);
    getPropertiesByFlatType(e.target.value);
  };
  const getPropertiesByFlatType = async (value) => {
    if (value) {
      try {
        const filtertedProporties = posts.filter((x) => x.type.includes(value));
        if (filtertedProporties.length > 0) {
          setFilter(filtertedProporties);
        } else {
          setFilter(posts);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  //<------>
  //default image---->
  const defaultImage =
    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80";

  //HOOKS ------->
  useEffect(() => {
    async function fetchPosts() {
      try {
        const datas = await apiService.getProperties();
        console.log(datas);
        if (datas.Properties.length > 0) {
          const imageItems = await Promise.all(
            datas.Properties.map(async (data) => {
              const image = await apiService.getImages(
                [data.images[0]],
                "imageUrl"
              );
              data.coverImage = image;
              return data;
            })
          );
          setPosts(imageItems);
          setFilter(imageItems);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts();
  }, []);

  const handleClick = (id) => {
    navigate(`/propertyviewpage/${id}`);
  };

  //DISPLAYING CURRRENT POSTS----->

  const LastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = LastPostIndex - postsPerPage;
  const currentPosts = filteredPosts.slice(FirstPostIndex, LastPostIndex);

  //PAGINATION CODE------>
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    //jsx code----->
    <>
      <Menu />
      <Container className="display-flex">
        <h3 className="text-center">All Properties</h3>
        <div>
          <Row>
            <div className="form">
              <Form>
                <Form.Group className="mb-5 mx-5" controlId="SelectDropdown">
                  <Row className="mt-2 ">
                    <Col md>
                      <Form.Label htmlFor=""></Form.Label>
                      <Form.Select
                        id="Select"
                        value={flatType}
                        onChange={onChangeFlatType}
                      >
                        <option>All Proporties</option>
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="Villa">Villa</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </div>
          </Row>
        </div>
        <div className="card">
          <Row className="g-4">
            {currentPosts.map(
              (
                post,
                index //mapping---->
              ) => (
                <Col md={6}>
                  <Card key={index}>
                    <Card.Img
                      variant="top"
                      src={post.coverImage || defaultImage}
                    />
                    <Card.ImgOverlay className="img-overlay">
                      <Button
                        onClick={() => {
                          handleClick(post._id);
                        }}
                        className="img-button"
                      >
                        {post.name}
                      </Button>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              )
            )}
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
