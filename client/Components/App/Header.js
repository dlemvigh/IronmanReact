import React from "react";
import Relay from "react-relay";
import { Link } from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Header extends React.Component {

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const isAuthenticated = this.props.auth.isAuthenticated();
    return (
      <header>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Ironman 70.3 Club</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {
                this.props.store.users.map(user => <LinkContainer key={user.username} to={`/${user.username}`}>
                  <NavItem>{user.name}</NavItem>
                </LinkContainer>)
              }
            </Nav>
            {
              !isAuthenticated &&
              <Nav pullRight>
                <NavItem onClick={this.login}>Login</NavItem>
              </Nav>
            }
            { isAuthenticated && 
            <Nav pullRight>
              <LinkContainer to="/graphs">
                <NavItem>Graphs</NavItem>
              </LinkContainer>
              <NavItem onClick={this.logout}>Logout</NavItem>
            </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }    
}

Header = Relay.createContainer(Header, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        users {
          name
          username                        
        }
      }
    `
  }
});

export default Header;