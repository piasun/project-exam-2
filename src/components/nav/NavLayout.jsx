import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getUser, isLoggedIn } from "../../hooks/useLocalStorage";
import LogoutButton from "../logout/logout";

const NavBar = () => {
  const user = getUser();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">PostIt</Navbar.Brand>
        {/* Uncomment these if you want to enable navbar toggler for smaller screens */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end"> */}
        <Nav className="ms-auto"> {/* Changed from ml-auto to ms-auto for Bootstrap 5 */}
          {isLoggedIn() ? (
            <>
              <Navbar.Text>
                Signed in as: <Link to="/profile" className="nav-link">{user.name}</Link>
              < LogoutButton />
              </Navbar.Text>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link> 
            </>
          )}
        </Nav>
        {/* Uncomment these if you want to enable navbar toggler for smaller screens */}
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
