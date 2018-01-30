import React from "react";
import Relay from "react-relay";
import { Link, withRouter } from "react-router";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

import CSSModules from "react-css-modules";
import styles from "./Header.scss";
import { getYearWeekId } from "../../../shared/util";

class Header extends React.Component {

  renderUserNav() {
    const username = this.props.params.username;
    if (!username) return null;
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
        this.props.store.users.map(user => (
          <LinkContainer key={user.username} to={`/${user.username}`}>
            <MenuItem>{user.name}</MenuItem>
          </LinkContainer>))
      }
      </NavDropdown>
    );
  }

  render() {
    const currentWeek = getYearWeekId();
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
            {
              this.renderUserNav()
            }
            <Nav pullRight>
              <LinkContainer to="/graphs">
                <NavItem>Graphs</NavItem>
              </LinkContainer>
                { this.renderAthletes(true) }
              <NavDropdown title="Seasons" id="seasons" styleName="dropdown">
                {
                  this.props.store.allSeasons
                    .filter(x => x.from <= currentWeek)
                    .sort((a,b) => b.from - a.from)
                    .map(season => (
                      <LinkContainer to={`/season/${season._id}`} key={season._id}>
                        <MenuItem>
                          {season.name}
                        </MenuItem>
                      </LinkContainer>
                    ))
                }
                <LinkContainer to="/season">
                  <MenuItem>
                      All time
                  </MenuItem>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }    
}

Header = CSSModules(Header, styles);

Header = withRouter(Header);

Header = Relay.createContainer(Header, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
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
  }
});

export default Header;