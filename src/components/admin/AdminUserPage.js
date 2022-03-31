import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination, Container } from "react-bootstrap";
import "../../css/AdminUserPage.css";
import Menu from "../Menu";
import Footer from "../Footer";

function AdminUserPage() {
  const [usersData, setUsersData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const pageNumbers = [];

  // Get Current Posts
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  let currentUserData;

  if (usersData !== null) {
    currentUserData = usersData.slice(indexOfFirstPost, indexOfLastPost);
    for (let i = 1; i <= Math.ceil(usersData.length / dataPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function getUserData() {
    const res = await axios("https://jsonplaceholder.typicode.com/posts");
    setUsersData(res.data);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Menu />
      <Container className="headingDiv">
        <h3>All users</h3>
        <button className="createUserButton">Create new user</button>
      </Container>
      <Container>
        {usersData !== null ? (
          <Table striped bordered hover className="userTable">
            <thead>
              <tr>
                <th>Prop Id</th>
                <th>Property Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentUserData.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.title}</td>
                  <td>
                    <button className="createUserButton">Update</button>
                  </td>
                  <td>
                    <button className="createUserButton">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Container>

      {usersData !== null ? (
        <Pagination style={{ justifyContent: "center" }}>
          {pageNumbers.map((number, index) => {
            return (
              <Pagination.Item key={index} onClick={() => paginate(number)}>
                {number}
              </Pagination.Item>
            );
          })}
        </Pagination>
      ) : null}

      <Footer />
    </>
  );
}

export default AdminUserPage;
