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
        console.log("wrapper")
        return (
            <div>
                {
                    this.props.user.activityConnection.edges.map(edge => {
                        return <Sandbox key={edge.node.id} activity={edge.node} />
                    })
                }
            </div>
        );
    }
}

SandboxWrapper = Relay.createContainer(SandboxWrapper, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                activityConnection(first: 5) {
                    edges {
                        node {
                            id
                            ${Sandbox.getFragment('activity')}
                        }
                    }
                }
            }
        `
    }
})

class SandboxRoute extends Relay.Route {
    static routeName = 'SandboxRoute';
    static queries = {
        user: (Component) => Relay.QL`
            query SandboxQuery {
                user(id: "5810e4e99425c73cdc9beb0b") {
                    ${Component.getFragment('user')}
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