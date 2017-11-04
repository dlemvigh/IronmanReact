import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";

import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts";

const colors = [
  "crimson",
  "purple",
  "orange"  
];

// const colorsDiscipline = {
//   "swim": "blue",
//   "bike": "yellow",
//   "run": "red",
//   "caloric": "green",
//   "misc": "grey"
// };

class Sandbox extends React.Component {

  formatData(summaries) {
    let data = {};
    for(let summary of summaries) {
      data[summary.week] = data[summary.week] || {};
      data[summary.week][summary.userName] = summary.score;
    }
    
    return Object.keys(data).map(key => {
      data[key].name = `Uge ${key}`;
      return data[key];
    });
  }

  render() {    
    const data2 = this.formatData(this.props.store.allSummaries);
    return (
      <div style={{height: "50vh"}}>
        <h2>Sandbox</h2>
        <ResponsiveContainer>
          <LineChart data={data2}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {
              this.props.store.users.map((x, index) => 
                <Line key={x.name} dataKey={x.name} stroke={colors[index]} />                  
              )
            }
          </LineChart>
        </ResponsiveContainer>
        {/*
          <Leaderboard store={this.props.store} />
          <Activity store={this.props.store} user={this.props.user} />
          */}
      </div>
    );
  }
}

Sandbox = createFragmentContainer(Sandbox, {
  store: graphql`
    fragment Sandbox_store on Store {
      ...Activity_store
      ...Leaderboard_store
      users {
        name
      }
      allSummaries {
        userName
        year
        week
        score
      }
    }
  `,
  user: graphql`
    fragment Sandbox_user on User {
      ...Activity_user
    }
  `
});

// export const SandboxQuery = graphql`
//   query SandboxQuery {
//     store {
//       ...Sandbox_store
//     }
//     user(username: "david") {
//       ...Sandbox_user
//     }
//   }
// `;

export default Sandbox;