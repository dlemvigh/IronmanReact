import React, { Component } from 'react';
import Loading from 'react-loading-bar';
import '!style!css!react-loading-bar/dist/index.css';

export default class LoadingExample extends Component {

  render() {
    return (
      <Loading
        show
        color="red"
      />
    );
  }
}