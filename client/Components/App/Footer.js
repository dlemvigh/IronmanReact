import React from "react";

import CSSModules from "react-css-modules";
import styles from "./Footer.modules.scss";

class Footer extends React.Component {
  render() {
    return (
      <footer styleName="background">
        <div className="container">
          <div styleName="left">
            <strong>Powered by Enthusiasm</strong>
          </div>
          <div styleName="right">
            App icons by <a href="https://icons8.com/">Icons8</a>
          </div>
        </div>
      </footer>
    );        
  }
}

export default CSSModules(Footer, styles);