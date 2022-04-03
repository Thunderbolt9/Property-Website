import React, { useEffect, useState } from "react";
import { Pagination, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../Menu";
import Footer from "../Footer";
import "../../css/ProposedProperty.css";
import apiService from "../../services/apiService";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

function ProposedPropertyPage() {
  const [property, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function getProposedProperties() {
      try {
        const datas = await apiService.getProposedProperties();
        console.log(datas);
        if (datas.message.length > 0) {
          const imageItems = await Promise.all(
            datas.message.map(async (data) => {
              const image = await apiService.getImages(
                [data.images[0]],
                "imageUrl"
              );
              data.coverImage = image;
              return data;
            })
          );
          setProperty(imageItems);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getProposedProperties();
  }, []);

  const handleClick = (id) => {
    navigate(`/propertyviewpage/${id}`);
  };

  const buildImages = () => {
    const indexOfLastProperty = currentPage * propertyPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertyPerPage;
    const currentProperties = property.slice(
      indexOfFirstProperty,
      indexOfLastProperty
    );
    let imageItems =
      currentProperties.length > 0 &&
      currentProperties.map((prop) => {
        return (
          <Col>
            <Card className="propertyImage">
              <Card.Img key={prop} src={prop.coverImage} />
              <Card.ImgOverlay className="imgOverlay">
                <div className="text-center">
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="button"
                    onClick={() => handleClick(prop._id)}
                  >
                    {prop.name}
                  </Button>
                </div>
              </Card.ImgOverlay>
            </Card>
          </Col>
        );
      });

    return imageItems;
  };

  // Pagination

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(property.length / propertyPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="spinner">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else {
    return (
      <>
        <Menu />
        <br />
        <h1 className="text-center">Posted Properties</h1>
        <br />
        <Row xs={1} md={2} className="propertyDiv">
          {property ? (
            buildImages()
          ) : (
            <Card.Img
              src={`https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80`}
            />
          )}
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

export default ProposedPropertyPage;
