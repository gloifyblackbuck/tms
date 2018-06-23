import React from 'react';
import PropTypes from "prop-types";
import Chart from '../UiChart';

const defaultTooltip = {
  headerFormat: '<b>{point.x}</b><br/>',
  pointFormat: '{series.name}: {point.y}'
};

const defaultLegend = {
  enabled: true,
  itemStyle: {
    color: '#888888',
    fontSize: '12px',
    padding: '6px'
  }
}

const UiSubChart = ({
  // categories,
  series,
  plotOptions = {},
  legend = {},
  chart = {},
  type = 'bar',
   xAxis = {},
   yAxis={},
   tooltip = defaultTooltip,
   ...props
 }) => {
  let chartConfig = {
    credits: {
      enabled: false
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      ...chart,
      type
    },
    title: {
      text: null
    },
    xAxis: {
      // categories: categories,
      ...xAxis
    },
    yAxis: {
      ...yAxis
    },
    legend: {
      ...defaultLegend,
      ...legend
    },
    tooltip,
    plotOptions: {
      [type]: {
        ...plotOptions,
        dataLabels: {
          style: {
            color: '#888888'
          },
          ...plotOptions.dataLabels
        }
      },
      series: {
        pointPadding: 0,
        groupPadding: 0
      }
    },
    series: series
  };

  return (
    <Chart config={chartConfig} domProps={{...props}} />
  )
}

UiSubChart.propTypes = {
  // categories: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
  plotOptions: PropTypes.object,
  type: PropTypes.oneOf(['bar', 'column','line']),
  chart: PropTypes.object,
  legend: PropTypes.object,
  xAxis: PropTypes.object,
  tooltip: PropTypes.object
}

export default UiSubChart
