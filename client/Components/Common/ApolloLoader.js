import React from "react";
import { Query } from "react-apollo";

export function withApollo(WrappedComponent, { query, variables }) {
  return ({ match, ...props }) => (
    <Query
      query={query}
      variables={{ ...((match && match.params) || {}), ...variables }}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        // return <div>test</div>
        return <WrappedComponent {...data} {...props} />;
      }}
    </Query>
  );
}
