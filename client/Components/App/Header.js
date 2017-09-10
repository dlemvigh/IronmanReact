import React from "react";
import Relay from "react-relay";
import { Link } from "react-router";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

import CSSModules from "react-css-modules";
import styles from "./Header.scss";
import { getYearWeekId } from "../../../shared/util";

class Header extends React.Component {

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  renderUserNav(profile) {
    return (
      <Nav>
        <IndexLinkContainer to={`/${profile.username}`}>
          <NavItem>Activities</NavItem>
        </IndexLinkContainer>
        <LinkContainer to={`/${profile.username}/goals`}>
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

  renderLogoutTitle(profile) {
    const imgStyle = {
      width: "4rem",
      height: "4rem",
      borderRadius: "2rem",
      margin: "-12px",
      marginRight: "1rem",
    };
    return (
      <strong>
        <img src={profile.picture} style={imgStyle}/>{profile.name}
      </strong>
    );
  }

  renderLogoutDropdown(profile) {
    return (
      <NavDropdown title={this.renderLogoutTitle(profile)} id="logout" styleName="dropdown">
        <MenuItem onClick={this.logout}>Sign out</MenuItem>
      </NavDropdown>
    );
  }

  render() {
    const profile = this.props.auth.getProfile();
    const isAuthenticated = this.props.auth.isAuthenticated();
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
              isAuthenticated && this.renderUserNav(profile)
            }
            {
              !isAuthenticated &&
              <Nav pullRight>
                <NavItem onClick={this.login}><strong>Sign in</strong></NavItem>
              </Nav>
            }
            { isAuthenticated && 
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
              { this.renderLogoutDropdown(profile) }
            </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }    
}

Header = CSSModules(Header, styles);

Header = Relay.createContainer(Header, {
  fragments: {
    activeUser: () => Relay.QL`
      fragment on User {
        username
      }
    `,
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