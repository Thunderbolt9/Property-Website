import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../App";
import store from "../redux/store";
import axios from "axios";
import "../css/Menu.css";

function AdminMenu() {
  const currentUser = useContext(AuthContext);

  const userName = currentUser !== null ? currentUser.name : null;
  const navigate = useNavigate();

  async function handleLogout() {
    await axios.post(
      "http://localhost:4000/api/v1/user/logout",
      {},
      { withCredentials: true }
    );

    store.dispatch({
      type: "userDeleted",
      payload: {
        user: null,
      },
    });

    navigate("/login");
  }

  return (
    <Navbar className="navbarBg" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="logo" style={{ color: "#75a5ff" }}>
          Property World
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/" className="navtext">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/adminpropertypage" className="navtext">
              Properties
            </Nav.Link>

            <Nav.Link href="/adminuserpage" className="navtext">
              Users
            </Nav.Link>

            <NavDropdown
              title={<span>{`Hello ${userName}`}</span>}
              id="basic-nav-dropdown"
              className="navtext"
            >
              <NavDropdown.Item href="/">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <button className="createUserButton" onClick={handleLogout}>
                  Logout
                </button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminMenu;
