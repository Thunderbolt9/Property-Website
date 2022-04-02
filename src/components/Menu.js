import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../App";
import store from "../redux/store";
import axios from "axios";
import "../css/Menu.css";

function Menu() {
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
            {currentUser !== null ? (
              <>
                <Nav.Link href="/sellerpage" className="navtext">
                  Sell
                </Nav.Link>
                <Nav.Link href="/" className="navtext">
                  Rent
                </Nav.Link>

                <NavDropdown
                  title={<span>{`Hello ${userName}`}</span>}
                  id="basic-nav-dropdown"
                  className="navtext"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/contactedproperties">
                    Contacted Properties
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/proposedproperties">
                    Proposed Properties
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <button className="createUserButton" onClick={handleLogout}>
                      Logout
                    </button>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <button
                className="createUserButton"
                style={{ width: "5rem" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
