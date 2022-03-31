import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import axios from "axios";
import { Container, Table, Pagination } from "react-bootstrap";
import "../../css/AdminPropertyPage.css";

function AdminPropertyPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //HOOKS ------->
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
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

      <Container>
        <div className="flex-container">
          <h1 className="set">All Properties</h1>
          <button className="setbutton">Create New</button>
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
                <td> {post.id}</td>
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
