import React, { Component } from 'react';
import PropTypes from "prop-types";
import Highcharts from 'highcharts';

const win = typeof global === 'undefined' ? window : global;

require('highcharts/highcharts-more')(Highcharts)

class Chart extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    isPureConfig: PropTypes.bool,
    neverReflow: PropTypes.bool,
    callback: PropTypes.func,
    domProps: PropTypes.object
  }

  static defaultProps = {
    callback: () => {},
    domProps: {}
  }

  // shouldComponentUpdate(nextProps) {
  //   return true;
  // }

  getChart() {
    if (!this.chart) {
      throw new Error('getChart() should not be called before the component is mounted');
    }
    return this.chart;
  }

  componentDidMount() {
    this.renderChart(this.props.config);
  }

  componentWillUnmount() {
    this.chart && this.chart.destroy();
  }

  componentDidUpdate() {
    this.renderChart(this.props.config)
  }

  renderChart(config) {
    if (!config) {
      throw new Error('Config must be specified for the chart component');
    }
    let chartConfig = config.chart;
    this.chart = new Highcharts.Chart({
      ...config,
      credits: {
        enabled: false
      },
      chart: {
        ...chartConfig,
        style: {
          ...chartConfig.style,
          fontFamily: 'Open sans',
          fontSize: '12px',
          color: '#888888'
        },
        renderTo: this.refs.chart
      }
    }, this.props.callback);

    if (!this.props.neverReflow) {
      win.requestAnimationFrame && requestAnimationFrame(() => {
        this.chart && this.chart.options && this.chart.reflow();
      });
    }
  }

  render() {
    return (
      <div ref='chart' {...this.props.domProps} />
    );
  }
}

export default Chart;
