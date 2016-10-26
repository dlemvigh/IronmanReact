import React from "react"
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Ironman 70.3 Club</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/leaderboard">
                                <NavItem eventKey={1}>Leaderboard</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/activity">
                                <NavItem eventKey={2}>Activity</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/sandbox">
                                <NavItem eventKey={3}>Sandbox</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
    
}