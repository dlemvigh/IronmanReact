import React from "react";
import Relay from "react-relay";
import _ from "lodash";
import moment from "moment";

import { colorsDiscipline } from "./Colors";
import GraphContainer from "./GraphContainer";

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

class Weekday extends React.Component {

  formatData(store) {
    let data = {};

    store.users.forEach(user => {
      user.activities.edges.forEach(edge => this.addData(data, edge.node));
    });
    
    return Object.keys(data).map(key => data[key]);
  }

  addData(data, activity) {
    const weekdayNumber = moment(activity.date).weekday() || 7; // makes sunday index 7 instead of 0
    const weekday = moment(activity.date).format('dddd');
    data[weekdayNumber] = data[weekdayNumber] || { weekday: weekday };
    data[weekdayNumber][activity.disciplineName] = (data[weekdayNumber][activity.disciplineName] || 0) + Math.round(activity.score);
  }

  render() {
    const data = this.formatData(this.props.store);
    return (
      <div>
        <h3>Points by weekday</h3>
        <GraphContainer>
          <BarChart  data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="weekday" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {
              Object.keys(colorsDiscipline).map(key => {
                  return <Bar key={key} dataKey={key} stackId="a" fill={colorsDiscipline[key]} />;
              })
            }
          </BarChart >
        </GraphContainer>
      </div>
    );
  }

}

Weekday = Relay.createContainer(Weekday, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        users {
          name
          activities(first: 1000) {
            edges {
              node {
                date
                score
                disciplineId
                disciplineName
              }
            }
          }
        }
      }
    `
  }
});


export default Weekday;
