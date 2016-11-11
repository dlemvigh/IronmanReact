import React from 'react'
import Relay from 'react-relay'
import CSSModules from 'react-css-modules'

import Header from "./Header"
import Footer from "./Footer"
import styles from "./App.scss"

import '!style!css!bootstrap/dist/css/bootstrap.min.css';
import '!style!css!bootstrap/dist/css/bootstrap-theme.min.css';
import '!style!css!react-datetime/css/react-datetime.css';

class App extends React.Component {

    render() {
        return (
            <div styleName="wrapper">
                <Header store={this.props.store} />
                <main styleName="content">
                    <div className="container">
                        {this.props.children}
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

App = CSSModules(App, styles);

App = Relay.createContainer(App, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                id
                ${Header.getFragment('store')}
            }
        `
    }
});

export default App;