import React, { Component } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import ChartWrapper from '../../chart.style';
import moment from 'moment';

export default class BookingAreaChart extends Component {
  formatXAxis(tickItem) {
    return moment(tickItem).format('MMM DD')
  }

  render() {
    const { datas, width, height, colors } = this.props;
    return (
      <ChartWrapper className="isoChartWrapper">
        <AreaChart
          width={width}
          height={height}
          data={datas}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="booking_date" tickFormatter={this.formatXAxis} stroke={colors[3]} />
          <YAxis stroke={colors[3]} unit="%" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="rolled_count"
            name='Market Booking'
            stackId="1"
            stroke={colors[1]}
            fill={colors[1]}
          />
        </AreaChart>
      </ChartWrapper>
    );
  }
}
