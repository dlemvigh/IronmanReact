import React from "react";
import Relay from "react-relay";
import { Link } from "react-router";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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

  renderLogoutTitle() {
    const profile = this.props.auth.getProfile();
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

  renderLogoutDropdown() {

    return (
      <NavDropdown title={this.renderLogoutTitle()} id="logout" styleName="dropdown">
        <NavItem onClick={this.logout}>Sign out</NavItem>
      </NavDropdown>
    );
  }

  render() {
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
            <Nav>
              { this.renderAthletes(this.props.store.users.length > 10) }
            </Nav>
            {
              !isAuthenticated &&
              <Nav pullRight>
                <NavItem onClick={this.login}><strong>Sign in</strong></NavItem>
              </Nav>
            }
            { isAuthenticated && 
            <Nav pullRight>
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
              <LinkContainer to="/graphs">
                <NavItem>Graphs</NavItem>
              </LinkContainer>
              { this.renderLogoutDropdown() }
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