import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Footer from "../Footer";
import { Container, Table, Pagination } from "react-bootstrap";
import "../../css/AdminPropertyPage.css";
import apiService from "../../services/apiService";
import { useNavigate } from "react-router-dom";
//Main Function----->
function AdminPropertyPage() {
  const [allProperties, setAllProperties] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  //get all the properties----->
  async function getPropertiesData() {
    try {
      const res = await apiService.getProperties(); //get all properties api----->
      console.log(res);
      setAllProperties(res);
      setServerError(false);
    } catch (err) {
      setServerError({ server_error: err.message });
    }
  }
  //delete api------>
  async function deleteProperties(id) {
    try {
      const res = await apiService.deleteProperty(id);
      console.log(res);
      getPropertiesData();
      setServerError(false);
    } catch (err) {
      setServerError({ server_error: err.message });
    }
  }

  useEffect(() => {
    getPropertiesData();
  }, []);

  // navigation------>
  function handleClick() {
    navigate("/sellerpage");
  }

  // for pagination----->
  const LastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = LastPostIndex - postsPerPage;
  let currentProperties;

  const pageNumbers = [];
  if (allProperties !== null) {
    currentProperties = allProperties.Properties.slice(
      FirstPostIndex,
      LastPostIndex
    );
    for (
      let i = 1;
      i <= Math.ceil(allProperties.Properties.length / postsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      {serverError !== false ? (
        <div className="text-danger">{serverError.server_error}</div>
      ) : (
        //jsx code----->
        <>
          <AdminMenu />
          <Container>
            <div className="flex-container">
              <h3 className="set">All Properties</h3>
              <button className="setbutton" onClick={handleClick}>
                Create New Property
              </button>
            </div>

            {allProperties !== null ? (
              <Table striped bordered hover className="userTable noWrap">
                <thead>
                  <tr>
                    <th>Property Id</th>
                    <th>Property Name</th>
                    <th>View</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProperties.map((properties, index) => (
                    <tr key={index}>
                      <td>{properties._id}</td>
                      <td>{properties.name}</td>
                      <td>
                        <button
                          className="setbutton1"
                          onClick={() => {
                            navigate(`/propertyviewpage/${properties._id}`);
                          }}
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          className="setbutton1"
                          onClick={() => {
                            navigate(`/editpropertypage/${properties._id}`);
                          }}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="setbutton1"
                          onClick={() => {
                            deleteProperties(properties._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : null}
          </Container>
          {allProperties !== null ? (
            <Pagination className="page">
              {pageNumbers.map((number) => {
                return (
                  <Pagination.Item onClick={() => paginate(number)}>
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
  );
}

export default AdminPropertyPage;
