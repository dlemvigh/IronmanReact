import React from "react";
import Relay from "react-relay";
import moment from "moment";
import _ from "lodash";

import { colors } from "./Colors";
import GraphContainer from "./GraphContainer";

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const maxWeeks = 10;

class WeeklyTotal extends React.Component {

  formatData(summaries) {
    let data = {};
    summaries.forEach(summary => {
      data[summary.week] = data[summary.week] || {};
      data[summary.week][summary.userName] = Math.round(summary.score);
    });
    const weeks = _(Object.keys(data))
      .sort((a,b) => a - b)
      .takeRight(maxWeeks)
      .value();

    return weeks.map(week => {
      data[week].key = week;
      data[week].name = `Uge ${week}`;
      return data[week];
    });
  }

  getFirstWeek(data) {
    return Math.min(...data.map(item => item.key));
  }

  calcWinnerTrendFunc(summaries, weekoffset) {
    const currentWeek = moment().week();
    const filtered = summaries.filter(summary => summary.week < currentWeek && summary.week >= weekoffset);
    const winners = _(filtered)
      .groupBy(x => x.week)
      .values()
      .value()
      .map(group => _.maxBy(group, x => x.score));
    const n = winners.filter(summary => summary.week < currentWeek).length;
    const sumXY = winners.reduce((acc, summary) => acc + (summary.week - weekoffset) * summary.score, 0);
    const sumX = winners.reduce((acc, summary) => acc + (summary.week - weekoffset), 0);
    const sumY = winners.reduce((acc, summary) => acc + summary.score, 0);
    const sumX2 = winners.reduce((acc, summary) => acc + (summary.week - weekoffset) * (summary.week - weekoffset), 0);

    const alpha = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const beta = (sumY - alpha * sumX) / n;
    const func = (week) => Math.round(alpha * (week - weekoffset) + beta);
    return [alpha, beta, func];    
  }

  calcTrendFunc(summaries, weekoffset) {
    const currentWeek = moment().week();
    const filtered = summaries.filter(summary => summary.week < currentWeek && summary.week >= weekoffset);
    const n = filtered.filter(summary => summary.week < currentWeek).length;
    const sumXY = filtered.reduce((acc, summary) => acc + (summary.week - weekoffset) * summary.score, 0);
    const sumX = filtered.reduce((acc, summary) => acc + (summary.week - weekoffset), 0);
    const sumY = filtered.reduce((acc, summary) => acc + summary.score, 0);
    const sumX2 = filtered.reduce((acc, summary) => acc + (summary.week - weekoffset) * (summary.week - weekoffset), 0);

    const alpha = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const beta = (sumY - alpha * sumX) / n;
    const func = (week) => Math.round(alpha * (week - weekoffset) + beta);
    return [alpha, beta, func];
  }

  render() {
    const data = this.formatData(this.props.store.allSummaries);
    const firstWeek = this.getFirstWeek(data);
    const [alpha, beta, trendFunc] = this.calcWinnerTrendFunc(this.props.store.allSummaries, firstWeek);
    const sign = alpha > 0 ? " + " : " ";
    const TrendKey = "trend";
    const TrendName = `Trend (${Math.round(beta)}${sign}${Math.round(alpha)} x)`;
    data.forEach(item => item[TrendKey] = trendFunc(item.key));

    return (
      <div>
        <h3>Points per week</h3>
        <GraphContainer>
          <LineChart data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}
          >
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
            <Line 
              dataKey={TrendKey} 
              name={TrendName} 
              stroke="black" 
              dot={false} 
              activeDot={false} 
              strokeDasharray="10 5"
            />                  
          </LineChart>
        </GraphContainer>
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
