import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import ChartWrapper from '../../chart.style';
import moment from 'moment';

export default class ProjectedRentBarChart extends Component {
  formatXAxis(tickItem) {
    return moment(tickItem).format('MMM YY')
  }

  render() {
    const { datas, width, height, colors } = this.props;
    var transformedData = [];
    if(datas) {
      transformedData = datas.map(function(d) {
        d.my_rent = parseInt(d.my_rent, 10);
        d.comp_rent = parseInt(d.comp_rent, 10);
        return d;
      });
    }

    return (
      <ChartWrapper className="isoChartWrapper">
        <BarChart
          width={width}
          height={height}
          data={transformedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" stroke={colors[3]} tickFormatter={this.formatXAxis}/>
          <YAxis stroke={colors[3]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="my_rent" fill={colors[0]} name='Property'/>
          <Bar dataKey="comp_rent" fill={colors[1]} name='Market Avg' />
        </BarChart>
      </ChartWrapper>
    );
  }
}
