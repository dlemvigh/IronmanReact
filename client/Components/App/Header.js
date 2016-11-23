import React from "react"
import Relay from "react-relay"
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

class Header extends React.Component {
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
                            {
                                this.props.store.users.map(user => <LinkContainer key={user.username} to={`/${user.username}`}>
                                    <NavItem>{user.name}</NavItem>
                                </LinkContainer>)
                            }
                            {/*
                            <LinkContainer to="/activity/5810e4e99425c73cdc9beb0b">
                                <NavItem eventKey={2}>Activity</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/sandbox">
                                <NavItem eventKey={3}>Sandbox</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/timelog">
                                <NavItem eventKey={4}>Timelog</NavItem>
                            </LinkContainer>
                            */}
                        </Nav>
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
})

export default Header