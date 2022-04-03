import React, { useEffect, useState } from "react";
import { Table, Pagination, Container, Spinner } from "react-bootstrap";
import "../../css/AdminUserPage.css";

import apiService from "../../services/apiService";
import Footer from "../Footer";
import AdminMenu from "../AdminMenu";
import { useNavigate } from "react-router-dom";

function AdminUserPage() {
  const [showSpinner, setSpinner] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  const pageNumbers = [];

  // Get Current Posts
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  let currentUserData;

  if (usersData !== null) {
    currentUserData = usersData.user.slice(indexOfFirstPost, indexOfLastPost);
    for (let i = 1; i <= Math.ceil(usersData.user.length / dataPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function getUserData() {
    try {
      setSpinner(true);
      const res = await apiService.getAllUsers();
      console.log(res);
      setUsersData(res);
      setServerError(false);
      setSpinner(false);
    } catch (err) {
      setServerError({ server_error: err.message });
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {showSpinner ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {serverError !== false ? (
            <div className="text-danger">{serverError.server_error}</div>
          ) : (
            <>
              <AdminMenu />
              <Container>
                <div className="headingDiv">
                  <h3>All users</h3>
                  <button
                    className="createUserButton"
                    onClick={() => {
                      navigate("/createnewuser");
                    }}
                  >
                    Create new user
                  </button>
                </div>

                {usersData !== null ? (
                  <Table striped bordered hover className="userTable noWrap">
                    <thead>
                      <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>View</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUserData.map((user, index) => (
                        <tr key={index}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>
                            <button
                              className="setButton"
                              onClick={() => {
                                navigate(`/viewuserprofile/${user._id}`);
                              }}
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <button className="setButton">Update</button>
                          </td>
                          <td>
                            <button className="setButton">Delete</button>
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
                      <Pagination.Item
                        key={index}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Pagination.Item>
                    );
                  })}
                </Pagination>
              ) : null}

              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
}

export default AdminUserPage;
