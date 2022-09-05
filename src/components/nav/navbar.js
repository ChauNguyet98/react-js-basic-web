import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      // <Navbar bg="light" expand="lg">
      //   <Container>
      //     <Navbar.Brand>React-Bootstrap</Navbar.Brand>
      //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //     <Navbar.Collapse id="basic-navbar-nav">
      //       <Nav className="me-auto">
      //         {/* <Nav.Link> */}
      //         <NavLink className="navbar__link" to="/home">
      //           Home
      //         </NavLink>
      //         {/* </Nav.Link> */}
      //         {/* <Nav.Link> */}
      //         <NavLink className="navbar__link" to="/list-user">
      //           List User
      //         </NavLink>
      //         {/* </Nav.Link> */}
      //       </Nav>
      //     </Navbar.Collapse>
      //   </Container>
      // </Navbar>

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <NavLink className="navbar__link" to="/home">
                Home
              </NavLink>
              <NavLink className="navbar__link" to="/list-user">
                List User
              </NavLink>
            </Nav>
            <div className="d-flex">
              <NavLink className="navbar__link" to="/login">
                <Button
                  variant="outline-success"
                  style={{ marginLeft: "auto" }}
                >
                  Login
                </Button>
              </NavLink>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
