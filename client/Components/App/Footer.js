import React from "react";
import { Container } from "react-bootstrap";

import CSSModules from "react-css-modules";
import styles from "./Footer.modules.scss";

class Footer extends React.Component {
  render() {
    return (
      <footer styleName="background">
        <Container styleName="container">
          <div>
            <strong>Powered by Enthusiasm</strong>
          </div>
          <div>
            App icons by <a href="https://icons8.com/">Icons8</a>
          </div>
        </Container>
      </footer>
    );        
  }
}

export default CSSModules(Footer, styles);