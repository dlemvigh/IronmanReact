import React from "react";
import Relay from "react-relay/classic";

class PageC extends React.Component {
  render() {
    return (
      <p>
        PageC
        <pre>
          {JSON.stringify(this.props.store, null, 2)}
        </pre>
      </p>
    );
  }
}

PageC = Relay.createContainer(PageC, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id
      }
    `
  }
});


export default PageC;