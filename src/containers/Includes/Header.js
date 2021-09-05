import React from "react";
import { Nav, Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/signinActions";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const signoutOnClick = () => {
    dispatch(signout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Rashid Mobiles
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/orders">
            View Orders
          </Nav.Link>
          <Nav.Link as={Link} to="/newbrand">
            New Brand
          </Nav.Link>
          <Nav.Link as={Link} to="/newproduct">
            New Product
          </Nav.Link>
        </Nav>
        <Nav>
          {auth.authenticate ? (
            <Nav.Link onClick={signoutOnClick}>Sign Out</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/signin">
                Sign in
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
