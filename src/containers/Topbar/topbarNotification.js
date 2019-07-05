import React, { Component } from "react";
import { Popover } from "antd";
import { connect } from "react-redux";
import IntlMessages from "../../components/utility/intlMessages";
import TopbarDropdownWrapper from "./topbarDropdown.style";
import { Link } from 'react-router-dom';

class TopbarNotification extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }
  render() {
    const { customizedTheme, user } = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarNotification">
        <div className="isoDropdownHeader">
          <h3>
            NOTIFICATIONS
          </h3>
        </div>
        <div className="isoDropdownBody">
          {user && user.user_notifications && user.user_notifications.length > 4 && user.user_notifications.slice(0, 4).map((e, i) => {
            return (
              <Link className="isoDropdownListItem" key={e.id} to="/dashboard/notifications" onClick={this.handleVisibleChange}>
                <h5>{e.notification_type ? e.notification_type.name : ''}</h5>
                <p><span dangerouslySetInnerHTML={{__html: e.message}} /></p>
              </Link>
            );
          })}
        </div>
        <Link className="isoViewAllBtn" to="/dashboard/notifications" onClick={this.handleVisibleChange}>
          <IntlMessages id="topbar.viewAll" />
        </Link>
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-android-notifications vpColor"
          />
          {user && user.user_notifications && user.user_notifications.length > 0 && (
            <span>
            {(user && user.user_notifications && user.user_notifications.filter(function(item) { return !item.viewed}).length > 0) ? user.user_notifications.filter(function(item) { return !item.viewed}).length : ''}
            </span>
          )}
        </div>
      </Popover>
    );
  }
}

export default connect(state => ({
  ...state.App,
  customizedTheme: state.ThemeSwitcher.topbarTheme,
  user: state.Auth.currentUser
}))(TopbarNotification);
