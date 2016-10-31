import React from "react"
import Relay from "react-relay"

class Sandbox extends React.Component {
    render() {
        const json = JSON.stringify(this.props, null, 2)
        return (
            <div>
                <span>sandbox</span>
                <pre>
                    {json}
                </pre>
            </div>
        );
    }
}

Sandbox = Relay.createContainer(Sandbox, {
    fragments: {
        activity: () => Relay.QL`
            fragment on Activity {
                disciplineName, 
                distance,
                unit,
                score,
                date
            }
        `
    }
});

class SandboxWrapper extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.store.activities.edges.map(edge => {
                        return <Sandbox key={edge.node.id} activity={edge.node} />
                    })
                }
            </div>
        );
    }
}

SandboxWrapper = Relay.createContainer(SandboxWrapper, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                id
                activities(first: 100) {
                    edges {
                        node {
                            id
                            ${Sandbox.getFragment('activity')}
                        }
                    }
                }
            }`,
    }
})

class SandboxRoute extends Relay.Route {
    static routeName = 'SandboxRoute';
    static queries = {
        store: (Component) => Relay.QL`
            query SandboxQuery {
                store {
                    ${Component.getFragment('store')}
                }
            }
        `
    }
}

class SandboxRoot extends React.Component {
    render() {
        return (
            <Relay.RootContainer
                Component={SandboxWrapper}
                route={new SandboxRoute()} />
        );
    }
}
export default SandboxRoot;