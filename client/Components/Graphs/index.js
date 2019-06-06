// import React from "react";
// import gql from "graphql-tag";

// import WeeklyTotal from "./WeeklyTotal";
// import Weekday from "./Weekday";

// class Graphs extends React.Component {
//   render() {
//     return (
//       <div>
//         <WeeklyTotal store={this.props.store} />
//         <Weekday store={this.props.store} />
//       </div>
//     );
//   }
// }

// Graphs = Relay.createContainer(Graphs, {
//   fragments: {
//     store: () => Relay.QL`
//       fragment Graphs_store on Store {
//         ${WeeklyTotal.getFragment('store')},
//         ${Weekday.getFragment('store')}
//         users {
//           id
//           name
//         }
//         allSummaries {
//           userName
//           year
//           week
//           score
//         }
//       }
//     `
//   }
// });

// export default Graphs;