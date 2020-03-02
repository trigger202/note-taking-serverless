import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Router } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./routes";
import { LinkContainer } from "react-router-bootstrap";
import { currentUserSession, doUserLogOut } from "./actions/Auth";
import history from "./utils/history";

function App(props) {
  useEffect(() => {
    props.authenticate();
  }, []);

  async function handleLogout() {
    await props.doUserLogOut();
  }
  const { isAuthenticated } = props;
  return (
    <div className="App container">
      <Router history={history}>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <NavItem onClick={handleLogout}>Logout</NavItem>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </Router>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: payload => dispatch(currentUserSession(payload)),
    doUserLogOut: payload => dispatch(doUserLogOut())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
