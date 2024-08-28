import React from "react";
import Container from "react-bootstrap/Container";
import Login from "../components/login/LoginForm";
import Register from "../components/login/register";

 
const Home = () => {
  return (
    <>
      <Container>
        <div className="container mt-5">
        <h1>Welcome to PostIt!</h1>
        <p>This is a social media platform where you can interact, post, and share your thoughts.</p> 
        <p>Get started by logging in or signing up!</p>
        </div>
        <div>
          <Login/>
        </div>
        <div>
          <Register/>
        </div>
      </Container>
    </>
  );
};
 
export default Home;