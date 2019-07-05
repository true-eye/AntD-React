import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import PageHeader from "../../components/utility/pageHeader";
import basicStyle from '../../settings/basicStyle';
import { TableViews } from '../Tables/antTables';
import { tableinfos } from './config/tableconfigs';
import propertiesActions from "../../redux/properties/actions";
import ContentHolder from "../../components/utility/contentHolder";
import Box from "../../components/utility/box";
import Spin from '../Feedback/Spin/spin.style';

const { getCompetition } = propertiesActions;

class Competition extends Component {
  componentDidMount() {
    this.loadCompetition();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user && nextProps.user && this.props.user.current_property !== nextProps.user.current_property){
      this.loadCompetition();
    }
  }

  loadCompetition = () => {
    const { getCompetition } = this.props;
    getCompetition({});
  };

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { getCompetition } = this.props;
    const {
      competition,
    } = this.props;

    return (
      <LayoutWrapper>
        <PageHeader>Competition</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <ContentHolder>
                <Spin spinning={this.props.loadingCompetition} size="large">
                  <TableViews.CompetitionView
                    tableInfo={tableinfos[0]}
                    dataSource={competition}
                    callback={getCompetition}
                  />
                </Spin>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    competition: state.Properties.competition,
    loadingCompetition: state.Properties.loadingCompetition,
    user: state.Auth.currentUser
  }),
  { getCompetition }
)(Competition);
