import React from "react";
import { Query } from "react-apollo";

export function withApollo(WrappedComponent, { ...options }) {
  return (...props) => (
    <Query {...options}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return <WrappedComponent {...data} {...props} />;
      }}
    </Query>
  );
}
