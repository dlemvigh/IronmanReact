import React from "react";
import gql from "graphql-tag";
import CSSModules from "react-css-modules";
import toastr from "toastr";

import Header from "./Header";
import Footer from "./Footer";
import Routes from "../../routes";
import styles from "./App.modules.scss";

import "../../Styles/custom.scss"
import "!style-loader!css-loader!../../Styles/react-datetime.css";
//import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
//import "!style-loader!css-loader!bootstrap/dist/css/bootstrap-theme.min.css";
//import "!style-loader!css-loader!react-datetime/css/react-datetime.css";
import "!style-loader!css-loader!toastr/build/toastr.min.css";

class App extends React.Component {
  componentDidMount() {
    toastr.options = {
      newestOnTop: true,
      positionClass: styles.toastr,
      progressBar: true
    };

    window.onerror = message => {
      toastr.error(message);
    };
  }

  render() {
    return (
      <div styleName="wrapper">
        <Header store={this.props.store} />
        <main styleName="content">
          <div className="container">
            <Routes />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

App.fragments = {
  store: gql`
    fragment App_store on Store {
      id
      ...Header_store
    }
    ${Header.fragments.store}
  `
};

export default CSSModules(App, styles);
