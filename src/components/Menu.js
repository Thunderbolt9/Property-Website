import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "../css/Menu.css";

function Menu() {
  return (
    <Navbar className="navbarBg" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="logo text-white">
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/" className="navtext text-white">
              Home
            </Nav.Link>
            <Nav.Link href="/buyerpage" className="navtext text-white">
              Buy
            </Nav.Link>
            <Nav.Link href="/sellerpage" className="navtext text-white">
              Sell
            </Nav.Link>
            <Nav.Link href="/" className="navtext text-white">
              Rent
            </Nav.Link>
            <NavDropdown
              title={<span className="text-white">Welcome Bhavesh</span>}
              id="basic-nav-dropdown"
              className="navtext"
            >
              <NavDropdown.Item href="/">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/contactedproperties">
                Contacted Properties
              </NavDropdown.Item>
              <NavDropdown.Item href="/proposedproperties">
                Proposed Properties
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
