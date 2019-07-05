import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';
import ChartWrapper from '../../chart.style';
import moment from 'moment';

export default class PricingLineChart extends Component {
  findMax(pricing, attribute) {
    return pricing.reduce(function (accumulator, currentValue){
      return (currentValue[attribute] && (currentValue[attribute] > accumulator[attribute])) ? currentValue : accumulator;
    });
  }

  findMin(pricing, attribute) {
    return pricing.reduce(function (accumulator, currentValue){
      if(!accumulator) {
        return currentValue;
      } else {
        return (currentValue[attribute] && (currentValue[attribute] < accumulator[attribute])) ? currentValue : accumulator;
      }
    });
  }

  formatXAxis(tickItem) {
    return moment(tickItem).format('MMM DD')
  }

  render() {
    const { datas, width, height } = this.props;
    var yx;
    var yn;

    if(datas && datas.length > 0) {
      let compMax = this.findMax(datas, 'max_comp_rate').max_comp_rate;
      let compMin = this.findMin(datas, 'min_comp_rate').min_comp_rate;
      let rateMax = this.findMax(datas, 'rate').rate;
      let rateMin = this.findMin(datas, 'rate').rate;
      let yMax = compMax > rateMax ? compMax : rateMax;
      let yMin = (compMin && (compMin < rateMin)) ? compMin : rateMin;

      yx = parseInt(yMax + 80, 10);
      yn = (yMin === 0) ? 0: yMin - 20;
    }

    return (
      <ChartWrapper>
        <LineChart
          width={width}
          height={height}
          data={datas}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey='booking_date' tickFormatter={this.formatXAxis} minTickGap={20}/>
          <YAxis type="number" unit="$" domain={[yn, yx]}>
            <Label value="Rate" position="insideLeft" angle={-90} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='rolled_rate' name='Your Rate' stroke='green' strokeWidth={2} dot={false}/>
          <Line type='monotone' dataKey='rolled_avg_rate' name='Avg Rate' stroke='red' style={{'opacity': '0.3'}} strokeWidth={2} dot={false}/>
          <Line type='monotone' dataKey='rolled_min_rate' name='Min Rate' stroke='orange' style={{'opacity': '0.3'}} strokeWidth={2} dot={false}/>
          <Line type='monotone' dataKey='rolled_max_rate' name='Max Rate' stroke='blue' style={{'opacity': '0.3'}} strokeWidth={2} dot={false}/>
        </LineChart>
      </ChartWrapper>
    );
  }
}
