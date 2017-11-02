import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";
import CSSModules from "react-css-modules";
import toastr from "toastr";

import { auth } from '../../Auth/Auth';
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
        <Header store={this.props.store} activeUser={this.props.activeUser} auth={auth} />
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

App = createFragmentContainer(App, {
  activeUser: graphql`
    fragment App_activeUser on User {
      ...Header_activeUser
    }
  `,
  store: graphql`
    fragment App_store on Store {
      id
      ...Header_store
    }
  `
});

export default App;