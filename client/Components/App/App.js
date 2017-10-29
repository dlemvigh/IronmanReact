import React from "react";
import Relay from 'react-relay/classic';
import CSSModules from "react-css-modules";
import toastr from "toastr";

import Header from "./Header";
import Footer from "./Footer";
import styles from "./App.scss";

import "!style!css!../../Styles/bootstrap.css";
import "!style!css!../../Styles/react-datetime.css";
//import "!style!css!bootstrap/dist/css/bootstrap.min.css";
//import "!style!css!bootstrap/dist/css/bootstrap-theme.min.css";
//import "!style!css!react-datetime/css/react-datetime.css";
import "!style!css!toastr/build/toastr.min.css";

class App extends React.Component {

  componentWillMount(){
    toastr.options = {
      newestOnTop: true,
      positionClass: styles.toastr,
      progressBar: true,
    };

    window.onerror = (message) => {
      toastr.error(message);
    };
  }

  render() {
    return (
      <div styleName="wrapper">
        <Header store={this.props.store} activeUser={this.props.activeUser} auth={this.props.auth} />
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
    activeUser: () => Relay.QL`
      fragment on User {
        ${Header.getFragment("activeUser")}
      }
    `,
    store: () => Relay.QL`
      fragment on Store {
        id
        ${Header.getFragment("store")}
      }
    `
  }
});

export default App;