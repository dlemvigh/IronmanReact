import React from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
const style = require('./Main.scss');

export default class Main extends React.Component {
    renderHeader() {
        return (
            <header>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Ironman 70.3 Club</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <LinkContainer to="/leaderboard">
                            <NavItem eventKey={1}>Leaderboard</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/activity">
                            <NavItem eventKey={2}>Activity</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </header>
        )
    }

    renderBody() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }

    renderFooter() {
        return (
            <footer>
                <div className="container">
                    Powered by Enthusiasm
                </div>
            </footer>
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </div>
        );
    }
}