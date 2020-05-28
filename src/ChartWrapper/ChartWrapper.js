import React, {Component} from 'react'
import D3Chart from './D3Chart/D3Chart'

export default class ChartWrapper extends Component {

  componentDidMount() {
    new D3Chart(this.refs.d3Chart)
  };

  render() {
    return (
      <div ref='d3Chart'></div>
    );
  }
}