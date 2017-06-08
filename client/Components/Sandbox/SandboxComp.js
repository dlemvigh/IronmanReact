import React from "react";
import Relay from 'react-relay/classic';

const route = {
  queries: {
    store: () => Relay.QL`
      query Store {
        store
      }
    `,
    test: () => Relay.QL`
      query Test {
        test
      }
    `,
  },
  params: {

  },
  name: "sandbox"
}

class Comp extends React.Component {
  render() {
    return (
      <pre>
        {JSON.stringify(this.props, null, 2)}
      </pre>
    );
  }
}

const Container = Relay.createContainer(Comp, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id
        echo
      }
    `,
    test: () => Relay.QL`
      fragment on Store {
        id
        echo
      }
    `
  }
})

class SandboxComp extends React.Component {
  render() {
    return (
      <div>comp
        <Relay.Renderer
          Container={Container}
          queryConfig={route}
          environment={Relay.Store}
          renderer={({done, error, props, retry, stale}) => {
            if (error) {
              return "error";
            }
            if (props) {
              return <Container {...props} />
            }
            return "loading...";
          }}
        />
      </div>
    );
  }
}

export default SandboxComp;
