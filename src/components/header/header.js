import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../JS/actions/usersAction";
import "./header.css";


function Header({ logout }) {
  return (
    <div>
      <Navbar variant="dark" className="navbar">
        <Navbar.Brand>Users App</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav.Link href="/" className="navLink" onClick={logout}>
          Log out
        </Nav.Link>
      </Navbar>
    </div>
  );
}

export default connect(null, { logout })(Header);
