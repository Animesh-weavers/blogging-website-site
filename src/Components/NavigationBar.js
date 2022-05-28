import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "../Auth/auth-context";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateHandler = () => {
    if (!authCtx.isLoggedIn) {
      navigate({ pathname: "/login" }, { replace: false });
      return;
    }
    navigate({ pathname: "/addblog" }, { replace: false });
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Blogger
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Blogs
            </Nav.Link>
            <Nav.Link onClick={navigateHandler}>Add Blog</Nav.Link>
            {!authCtx.isLoggedIn && (
              <Nav.Link
                style={{
                  background: "#FBDE59",
                  borderRadius: "10px",
                  paddingRight: "2rem",
                  paddingLeft: "2rem",
                  color: "black",
                  fontWeight: "bold",
                }}
                as={Link}
                to="/login"
              >
                Login
              </Nav.Link>
            )}
            {/* {authCtx.isLoggedIn && <Nav.Link style={{ background: '#FBDE59', borderRadius: '10px', paddingRight: '2rem', paddingLeft: '2rem', color: 'black', fontWeight: 'bold' }} onClick={() => authCtx.logout()}>Logout</Nav.Link>} */}
            {authCtx.isLoggedIn && (
              <NavDropdown title="User" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/changepassword">
                  ChangePassword
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => authCtx.logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
