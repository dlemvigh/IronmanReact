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
      data[summary.week][summary.userName] = Math.round(summary.score);
    })

    return Object.keys(data).map(key => {
      data[key].key = key;
      data[key].name = `Uge ${key}`;
      return data[key];
    });
  }

  getFirstWeek(data) {
    return Math.min(...data.map(item => item.key));
  }

  calcTrendFunc(summaries, weekoffset) {
    const n = summaries.length;
    const sumXY = summaries.reduce((acc, summary) => acc + (summary.week - weekoffset) * summary.score, 0);
    const sumX = summaries.reduce((acc, summary) => acc + (summary.week - weekoffset), 0);
    const sumY = summaries.reduce((acc, summary) => acc + summary.score, 0);
    const sumX2 = summaries.reduce((acc, summary) => acc + (summary.week - weekoffset) * (summary.week - weekoffset), 0);

    const alpha = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const beta = (sumY - alpha * sumX) / n;
    const func = (week) => Math.round(alpha * (week - weekoffset) + beta);
    return [alpha, beta, func];
  }

  render() {
    const data = this.formatData(this.props.store.allSummaries);
    const firstWeek = this.getFirstWeek(data);
    const [alpha, beta, trendFunc] = this.calcTrendFunc(this.props.store.allSummaries, firstWeek);
    const TrendKey = `Trend (${Math.round(beta)} + ${Math.round(alpha)} x)`
    data.forEach(item => item[TrendKey] = trendFunc(item.key));

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
            <Line dataKey={TrendKey} stroke="black" />                  
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
