import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'

import Main from '../Main/Main'
import Activity from '../Activity/Activity'
import Leaderboard from '../Leaderboard/Leaderboard'

export default class App extends React.Component {
  render(){
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Main}>
          <IndexRedirect to="/leaderboard" />
          <Route path='/activity' component={Activity} />
          <Route path='/leaderboard' component={Leaderboard} />
        </Route>
      </Router>
    );    
  }
}
