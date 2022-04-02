import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Footer from "../Footer";
import axios from "axios";
import { Container, Table, Pagination } from "react-bootstrap";
import "../../css/AdminPropertyPage.css";

function AdminPropertyPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const LastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = LastPostIndex - postsPerPage;
  const currentPosts = posts.slice(FirstPostIndex, LastPostIndex);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <AdminMenu />
      <Container>
        <div className="flex-container">
          <h3 className="set">All Properties</h3>
          <button className="setbutton">Create New Property</button>
        </div>

        <Table striped bordered responsive className="noWrap">
          <thead>
            <tr>
              <th>Prop Id</th>
              <th>Property Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {currentPosts.map((post) => (
              <tr>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  <button className="setbutton1">Update</button>
                </td>
                <td>
                  <button className="setbutton1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

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

export default AdminPropertyPage;
