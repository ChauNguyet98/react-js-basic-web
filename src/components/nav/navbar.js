import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link> */}
              <NavLink className="navbar__link" to="/home">
                Home
              </NavLink>
              {/* </Nav.Link> */}
              {/* <Nav.Link> */}
              <NavLink className="navbar__link" to="/list-user">
                List User
              </NavLink>
              {/* </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
