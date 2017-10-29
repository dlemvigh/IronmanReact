import React from "react";
import Relay from 'react-relay/classic';
import { Link } from "found";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

import { auth } from '../../Auth/Auth';
import CSSModules from "react-css-modules";
import styles from "./Header.scss";
import { getYearWeekId } from "../../../shared/util";

class Header extends React.Component {

  login = () => {
    auth.login();
  }

  logout = () => {
    auth.logout();
  }

  renderUserNav(profile) {
    return (
      <Nav>
        <NavItem href={`/${profile.username}`}>Activities</NavItem>
        <NavItem href={`/${profile.username}/goals`}>Personal goals</NavItem>
      </Nav>
    );
  }

  renderAthletes(compactMode) {
    return compactMode ? this.renderAthleteDropdown() : this.renderAthleteLinks();
  }

  renderAthleteLinks() {
    return this.props.store.users.map(user => (
      <NavItem key={user.username} to={`/${user.username}`}>{user.name}</NavItem>
    ));
  }

  renderAthleteDropdown() {
    return (
      <NavDropdown title="Athletes" id="athletes">
        {
          this.props.store.users.map(user => (
            <MenuItem key={user.username} to={`/${user.username}`}>{user.name}</MenuItem>
          ))
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
        <img src={profile.picture} style={imgStyle} />{profile.name}
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
    const profile = auth.getProfile();
    const isAuthenticated = auth.isAuthenticated();
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
              <NavItem href="/graphs">Graphs</NavItem>
              { this.renderAthletes(true) }
              <NavDropdown title="Seasons" id="seasons" styleName="dropdown">
                {
                  this.props.store.allSeasons
                    .filter(x => x.from <= currentWeek)
                    .sort((a,b) => b.from - a.from)
                    .map(season => (
                      <MenuItem to={`/season/${season._id}`} key={season._id}>
                        {season.name}
                      </MenuItem>
                    ))
                }
                <MenuItem to="/season">
                    All time
                </MenuItem>
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