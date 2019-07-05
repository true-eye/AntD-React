import React, { Component } from "react";
import { connect } from "react-redux";
import appAction from "../../redux/app/actions";
import qs from 'query-string';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Spin from '../Feedback/Spin/spin.style';
import PageHeader from "../../components/utility/pageHeader";

const { demoSetup } = appAction;

class Try extends Component {
  constructor(props) {
    super(props);

    var gis = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).gis

    console.log(gis);

    if(gis) {
      this.props.demoSetup({gis:gis});
    }
  }

  render() {
    return (
      <LayoutWrapper>
        <Spin spinning={true} size="large">
          <PageHeader>Setting Up Demo</PageHeader>
        </Spin>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
  }),
  { demoSetup }
)(Try);
