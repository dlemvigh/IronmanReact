import React from 'react'
import CSSModules from 'react-css-modules'

import Header from "./Header"
import Footer from "./Footer"
import styles from "./Main.scss"

class Main extends React.Component {

    render() {
        return (
            <div styleName="wrapper">
                <Header />
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

export default CSSModules(Main, styles);