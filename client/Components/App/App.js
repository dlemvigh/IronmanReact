import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
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
        <Header store={this.props.store} activeUser={this.props.user} auth={auth} />
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
  user: graphql`
    fragment App_user on User {
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

export const AppQuery = graphql`
  query AppQuery(
    $activeUser: String, 
    $hasActiveUser: Boolean!
  ) {
    user(username: $activeUser) @include(if: $hasActiveUser) {
      ...App_user
    }
    store {
      ...App_store
    }
  }
`;

export default App;