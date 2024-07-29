import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuthContext } from "../../context/authContext";
import LogoutButton from "../logout/logout"; 

const NavBar = () => {
  const { user, isAuthenticated } = useAuthContext();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">PostIt</Navbar.Brand>
        <Nav className="ms-auto">
          {isAuthenticated ? ( 
            <>
              <Navbar.Text>
                Signed in as: <Link to="/profile" className="nav-link">{user?.name}</Link>
              </Navbar.Text>
              <LogoutButton />
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
