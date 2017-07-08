import React from "react";
import Relay from "react-relay";
import { Link } from "react-router";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import CSSModules from "react-css-modules";
import styles from "./Header.scss";

class Header extends React.Component {

  renderAthletes(compactMode) {
    return compactMode ? this.renderAthleteDropdown() : this.renderAthleteLinks();
  }

  renderAthleteLinks() {
    return this.props.store.users.map(user => (
      <LinkContainer key={user.username} to={`/${user.username}`}>
        <NavItem>{user.name}</NavItem>
      </LinkContainer>
    ));
  }

  renderAthleteDropdown() {
    return (
      <NavDropdown title="Athletes" id="athletes">
      {
        this.props.store.users.map(user => <LinkContainer key={user.username} to={`/${user.username}`}>
          <MenuItem>{user.name}</MenuItem>
        </LinkContainer>)
      }
      </NavDropdown>
    );
  }

  render() {
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
              { this.renderAthletes(this.props.store.users.length > 10) }
            </Nav>
            <Nav pullRight>
              <NavDropdown title="Seasons" id="seasons" styleName="dropdown">
                <LinkContainer to="/season/spring-2017">
                  <MenuItem>
                      Spring 2017
                  </MenuItem>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/graphs">
                <NavItem>Graphs</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }    
}

Header = CSSModules(Header, styles);

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