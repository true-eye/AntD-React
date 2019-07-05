import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import LayoutWrapper from "../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../components/utility/pageHeader";
import ContentHolder from "../../../components/utility/contentHolder";
import Box from "../../../components/utility/box";
import basicStyle from "../../../settings/basicStyle";
import BasicMarker from "./maps/basicMarker";
import propertiesActions from "../../../redux/properties/actions";

const { getCompetition } = propertiesActions;

class GoogleMap extends Component {
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
    const {
      user,
      competition,
    } = this.props;

    return (
      <LayoutWrapper>
        <PageHeader>Map</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box
              title="Property Locations"
            >
              <ContentHolder>
                <BasicMarker user={user} competition={competition} />
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
    user: state.Auth.currentUser
  }),
  { getCompetition }
)(GoogleMap);
