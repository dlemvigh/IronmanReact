import React from "react";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { Navbar, Nav, NavItem, NavDropdown, Container } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

import CSSModules from "react-css-modules";
import styles from "./Header.modules.scss";
import { getYearWeekId } from "../../../shared/util";

class Header extends React.Component {
  renderUserNav() {
    // FIXME match doesn't contain username
    const username = this.props.match.params.username;
    if (!username) { return null; }
    return (
      <Nav>
        <IndexLinkContainer to={`/${username}`}>
          <NavItem>Activities</NavItem>
        </IndexLinkContainer>
        <LinkContainer to={`/${username}/goals`}>
          <NavItem>Personal goals</NavItem>
        </LinkContainer>
      </Nav>
    );
  }

  renderAthletes(compactMode) {
    return compactMode
      ? this.renderAthleteDropdown()
      : this.renderAthleteLinks();
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
        {this.props.store.users.map(user => (
          <LinkContainer key={user.username} to={`/${user.username}`}>
            <NavDropdown.Item>{user.name}</NavDropdown.Item>
          </LinkContainer>
        ))}
      </NavDropdown>
    );
  }

  render() {
    const currentWeek = getYearWeekId();
    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                Ironman 70.3 Club
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse>
              {this.renderUserNav()}
              <Nav className="ml-auto">
                <LinkContainer to="/graphs">
                  <Nav.Link>Graphs</Nav.Link>
                </LinkContainer>
                {this.renderAthletes(true)}
                <NavDropdown title="Seasons" id="seasons" styleName="dropdown">
                  {this.props.store.allSeasons
                    .filter(x => x.from <= currentWeek)
                    .sort((a, b) => b.from - a.from)
                    .map(season => (
                      <LinkContainer
                        to={`/season/${season._id}`}
                        key={season._id}
                      >
                        <NavDropdown.Item>{season.name}</NavDropdown.Item>
                      </LinkContainer>
                    ))}
                  <LinkContainer to="/season">
                    <NavDropdown.Item>All time</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

Header = CSSModules(Header, styles);

Header = withRouter(Header);

Header.fragments = {
  store: gql`
    fragment Header_store on Store {
      users {
        name
        username
      }
      allSeasons {
        _id
        name
        from
      }
    }
  `
};

export default Header;
