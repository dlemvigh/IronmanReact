import React from "react"
import Relay from "react-relay"
import moment from 'moment'

import CatchupList from "../Catchup/CatchupList"

class Catchup extends React.Component {

    render() {
        return (
            <div>
                <h3>Catchup</h3>
                <CatchupList store={this.props.store} />
            </div>
        )
    }
}

Catchup = Relay.createContainer(Catchup, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                ${CatchupList.getFragment('store')}
            }
        `
    }
})

export default Catchup;