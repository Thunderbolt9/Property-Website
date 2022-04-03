import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { PieChart, Pie, Tooltip } from "recharts";
import apiService from "../../services/apiService";
import AdminMenu from "../AdminMenu";
import Footer from "../Footer";
import "../../css/AdminDashboard.css";

function AdminDashboard() {
  const [serverError, setServerError] = useState(null);
  const [mostContacted, setMostContacted] = useState(null);
  const [recentlyCreated, setRecentlyCreated] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);

  async function getDashboardData() {
    try {
      const resContactProps = await apiService.getMostContacted();
      const resRecentProps = await apiService.getRecentlyCreated();
      const resAllProps = await apiService.getProperties();
      const resAllUsers = await apiService.getAllUsers();

      let totalUsers = resAllUsers.user.length;
      let totalAdmins = 0;

      let MinPrice = resAllProps.Properties[0].price;
      let MaxPrice = resAllProps.Properties[0].price;
      let sumOfPrice = resAllProps.Properties[0].price;
      let lengthOfAllProperty = resAllProps.Properties.length;

      const topContactedProps = [];
      const topRecentProps = [];

      let index;

      // Get top 5 contacted properties
      for (index = 0; index < resContactProps.Properties.length; index++) {
        if (index <= 5) {
          topContactedProps.push(resContactProps.Properties[index]);
        }
      }

      // Get top 5 recent properties
      for (index = 0; index < resRecentProps.Properties.length; index++) {
        if (index <= 5) {
          topRecentProps.push(resRecentProps.Properties[index]);
        }
      }

      // Get Minimum Price, Maximum Price, and Average Price
      for (index = 1; index < resAllProps.Properties.length; index++) {
        if (resAllProps.Properties[index].price < MinPrice) {
          MinPrice = resAllProps.Properties[index].price;
        } else if (resAllProps.Properties[index].price > MaxPrice) {
          MaxPrice = resAllProps.Properties[index].price;
        }

        sumOfPrice += resAllProps.Properties[index].price;
      }

      // Get Count of Total admins
      for (index = 0; index < resAllUsers.user.length; index++) {
        if (resAllUsers.user[index].role !== "Normal") {
          totalAdmins += 1;
        }
      }

      // Creating data for the pie chart
      const data = [
        { name: "Total Admin User", value: totalAdmins },
        { name: "Total Normal User", value: totalUsers - totalAdmins },
      ];

      setMostContacted(topContactedProps);
      setRecentlyCreated(topRecentProps);
      setPieChartData(data);
      setMinPrice(MinPrice);
      setMaxPrice(MaxPrice);
      setAvgPrice(sumOfPrice / lengthOfAllProperty);

      setServerError(false);
    } catch (err) {
      setServerError({ server_error: err.message });
    }
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <AdminMenu />

      {mostContacted !== null &&
      recentlyCreated !== null &&
      serverError === false &&
      pieChartData !== null ? (
        <>
          <Container className="priceContainer" style={{ marginTop: "5rem" }}>
            <Row>
              <Col className="divBorder">
                <div>
                  <h4>Min Price</h4>
                  <h1 style={{ color: "#75a5ff" }}>
                    {minPrice
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </h1>
                </div>
              </Col>
              <Col className="divBorder">
                <div>
                  <h3>Avg Price</h3>
                  <h1 style={{ color: "#75a5ff" }}>
                    {Math.round(avgPrice)
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </h1>
                </div>
              </Col>
              <Col>
                <div>
                  <h3>Max Price</h3>
                  <h1 style={{ color: "#75a5ff" }}>
                    {maxPrice
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </h1>
                </div>
              </Col>
            </Row>
          </Container>

          <Container style={{ marginTop: "4rem", textAlign: "Center" }}>
            <Row>
              <Col>
                <h4 className="mb-3">Users Information</h4>
                <PieChart width={400} height={325} className="border">
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    fill="#75A5FF"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </Col>
              <Col sm={8}>
                <h4>Most Contacted</h4>
                <Table striped bordered hover className="mt-3 noWrap">
                  <thead>
                    <tr>
                      <th>Property Id</th>
                      <th>Property Name</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mostContacted.map((property, index) => (
                      <tr key={index}>
                        <td>{property._id}</td>
                        <td>{property.name}</td>
                        <td>{property.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>

          <Container
            style={{
              marginTop: "4rem",
              textAlign: "Center",
              marginBottom: "4rem",
            }}
          >
            <Row>
              <Col></Col>
              <Col sm={8}>
                <h4>Recently Created</h4>
                <Table striped bordered hover className="mt-3 noWrap">
                  <thead>
                    <tr>
                      <th>Property Id</th>
                      <th>Property Name</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentlyCreated.map((property, index) => (
                      <tr key={index}>
                        <td>{property._id}</td>
                        <td>{property.name}</td>
                        <td>{property.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <h1>{serverError}</h1>
      )}

      <Footer />
    </>
  );
}

export default AdminDashboard;
