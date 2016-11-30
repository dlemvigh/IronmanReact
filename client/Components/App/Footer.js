import React from "react";

import CSSModules from "react-css-modules";
import styles from "./Footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <footer styleName="background">
        <div className="container">
                    Powered by Enthusiasm
                </div>
      </footer>
    );        
  }
}

export default CSSModules(Footer, styles);