import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../App";
import "../css/Menu.css";

function Menu() {
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
              Home
            </Nav.Link>
            <Nav.Link href="/buyerpage" className="navtext">
              Buy
            </Nav.Link>
            <Nav.Link href="/sellerpage" className="navtext">
              Sell
            </Nav.Link>
            <Nav.Link href="/" className="navtext">
              Rent
            </Nav.Link>
            <NavDropdown
              title={<span>Welcome Bhavesh</span>}
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
              <NavDropdown.Item href="/proposedproperties">
                <button className="createUserButton">Logout</button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
