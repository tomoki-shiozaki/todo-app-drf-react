import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";

import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodosList from "./components/TodosList";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>React-bootstrap</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
