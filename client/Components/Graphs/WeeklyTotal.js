import React from "react";
import Relay from "react-relay";
import _ from "lodash";

import { colors } from "./Colors";

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";

class WeeklyTotal extends React.Component {

  formatData(summaries) {
    let data = {};

    summaries.forEach(summary => {
      data[summary.week] = data[summary.week] || {};
      data[summary.week][summary.userName] = summary.score;      
    })

    return Object.keys(data).map(key => {
      data[key].name = `Uge ${key}`;
      return data[key];
    });
  }

  render() {
    const data = this.formatData(this.props.store.allSummaries);

    return (
      <div style={{height: "50vh"}}>
        <h3>Points per week</h3>
        <ResponsiveContainer>
          <LineChart data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {
              this.props.store.users.map((x, index) => 
                <Line key={x.name} dataKey={x.name} type="monotone" stroke={colors[index]} />                  
              )
            }
           </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

}

WeeklyTotal = Relay.createContainer(WeeklyTotal, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
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
    `
  }
});


export default WeeklyTotal;
