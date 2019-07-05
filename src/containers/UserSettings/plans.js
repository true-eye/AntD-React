import React from 'react';
import { Row, Col } from 'antd';
import basicStyle from '../../settings/basicStyle';
import Box from "../../components/utility/box";
import Button from "../../components/uielements/button";
import settingsActions from '../../redux/settings/actions';
import { connect } from 'react-redux';
import Spin from '../Feedback/Spin/spin.style';
import ContactUs from './contactUs';

const { getPlans, updatePlan, toggleContactModal } = settingsActions;

class Plans extends React.Component {
  componentDidMount() {
    this.loadPlans();
  }

  loadPlans = () => {
    const { getPlans } = this.props;
    getPlans();
  };

  onPlanSelect = (plan) => {
    const { updatePlan } = this.props;
    console.log("onPlanSelect");
    updatePlan(plan);
  };

  onContactUsSelect = () => {
    const { toggleContactModal } = this.props;
    console.log("toggling modal");
    toggleContactModal();
  };

  render() {
    const {
      user,
      plans
    } = this.props;
    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <div className="isoNoteTextbox">
        <ContactUs />
        <Spin spinning={this.props.loadingPlans} size="large">
          <Row style={rowStyle} gutter={gutter} justify="start">
            {plans && plans.map(plan => (
              <Col md={8} sm={24} xs={24} style={colStyle} key={plan.id}>
                <Box style={{borderRadius: 10}}>
                  <div className="card">
                    <div className="card-body">
                      <div className="isoAlGridContents">

                        <div className="isoAlGridPriceRating">
                          {plan.can_select && (
                            <span className="isoAlGridPrice">${parseFloat(plan.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}/Month</span>
                          )}
                          {!plan.can_select && (
                            <span className="isoAlGridPrice">Contact Us</span>
                          )}
                        </div>

                        <div>
                          <div className="isoAlGridName">
                            <h2>{plan.name} Plan</h2>
                          </div>
                          <div className="isoAlGridDescription">
                            {plan.description}
                          </div>
                        </div>

                        <div className="isoSelectButton">
                          {user && plan.can_select && (!user.settings.selected_plan || user.settings.selected_plan !== plan.plan_type) && (
                            <Button type="primary" onClick={() => this.onPlanSelect(plan.plan_type)}>
                              Select
                            </Button>
                          )}
                          {user && user.settings.selected_plan === plan.plan_type && (
                            <h2>Currently Selected Plan</h2>
                          )}
                          {user && !plan.can_select && (!user.settings.selected_plan || user.settings.selected_plan !== plan.plan_type) && (
                            <Button type="primary" onClick={() => this.onContactUsSelect()}>
                              Contact Us
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Col>
            ))}

          </Row>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.Auth.currentUser,
    plans: state.Settings.plans,
    loadingPlans: state.Settings.loadingPlans
  };
}
export default connect(
  mapStateToProps,
  {
    getPlans,
    updatePlan,
    toggleContactModal,
  }
)(Plans);
