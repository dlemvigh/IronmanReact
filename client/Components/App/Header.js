import React from "react"
import Relay from "react-relay"
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

class Header extends React.Component {
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
                            <LinkContainer to="/leaderboard">
                                <NavItem>Leaderboard</NavItem>
                            </LinkContainer>
                            {
                                this.props.store.users.edges.map(edge => <LinkContainer key={edge.node.username} to={`/activity/${edge.node.username}`}>
                                    <NavItem>{edge.node.name}</NavItem>
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
                users(first: 100) {
                    edges {
                        node {
                            name
                            username                        
                        }
                    }
                }
            }
        `
    }
})

export default Header