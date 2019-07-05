import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Dropdown, Icon, Avatar } from "antd";
import appActions from "../../redux/app/actions";
import TopbarNotification from "./topbarNotification";
import TopbarUser from "./topbarUser";
import TopbarWrapper from "./topbar.style";

const { Header } = Layout;
const { toggleCollapsed, changeProperty, changeListing } = appActions;

class Topbar extends Component {
  handlePropertyChange = (key) => {
    const { changeProperty } = this.props;
    changeProperty(key);
  };
  handleListingChange = (key) => {
    const { changeListing } = this.props;
    changeListing(key);
  };

  render() {
    const menu = (
      <Menu onClick={this.handlePropertyChange}>
        {this.props.user && this.props.user.properties && this.props.user.properties.map(property => (
          <Menu.Item key={property.id}>{property.street_address}</Menu.Item>
        ))}
      </Menu>
    );
    const marketmenu = (
      <Menu onClick={this.handleListingChange}>
        {this.props.user && this.props.user.current_user_property && this.props.user.current_user_property[0] && this.props.user.current_user_property[0].airbnb_listing && (
          <Menu.Item key={this.props.user.current_user_property[0].airbnb_listing.id}>
            { this.props.user.current_user_property[0].airbnb_listing.picture_1_url && (
              <Avatar size="large" shape="square" src={this.props.user.current_user_property[0].airbnb_listing.picture_1_url} />
            )}
            { !this.props.user.current_user_property[0].airbnb_listing.picture_1_url && (
              this.props.user.current_user_property[0].airbnb_listing.current_listing_info_snapshot.listing_title
            )}
            &nbsp; - AirBnb
          </Menu.Item>
        )}
        {this.props.user && this.props.user.current_user_property && this.props.user.current_user_property[0] && this.props.user.current_user_property[0].vrbo_listing && (
          <Menu.Item key={this.props.user.current_user_property[0].vrbo_listing.id}>
            { this.props.user.current_user_property[0].vrbo_listing.picture_1_url && (
              <Avatar size="large" shape="square" src={this.props.user.current_user_property[0].vrbo_listing.picture_1_url} />
            )}
            { !this.props.user.current_user_property[0].vrbo_listing.picture_1_url && (
              this.props.user.current_user_property[0].vrbo_listing.current_listing_info_snapshot.listing_title
            )}
            &nbsp; - VRBO
          </Menu.Item>
        )}
      </Menu>
    );
    const { toggleCollapsed, customizedTheme, locale } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: "fixed",
      width: "100%",
      height: 70
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
            <Dropdown overlay={menu} className="isoUserDropdown propertyDropDown">
              <a className="ant-dropdown-link" href="#props">
                {this.props.user && this.props.user.current_property ? this.props.user.current_property.street_address : ''} <Icon type="down" />
              </a>
            </Dropdown>
            <Dropdown overlay={marketmenu} className="isoUserDropdown propertyDropDown">
              <a className="ant-dropdown-link" href="#markets">
                {this.props.user && this.props.user.current_user_property && this.props.user.current_user_property[0] && this.props.user.current_user_property[0].currently_selected_listing && (
                  <span>
                  { this.props.user.current_user_property[0].currently_selected_listing.picture_1_url && (
                    <Avatar size="large" shape="square" src={this.props.user.current_user_property[0].currently_selected_listing.picture_1_url} />
                  )}
                  { !this.props.user.current_user_property[0].currently_selected_listing.picture_1_url && (
                    this.props.user.current_user_property[0].currently_selected_listing.current_listing_info_snapshot.listing_title
                  )}
                  </span>
                )}  <Icon type="down" />
              </a>
            </Dropdown>
          </div>

          <ul className="isoRight">
            <li
              onClick={() => this.setState({ selectedItem: "notification" })}
              className="isoNotify"
            >
              <TopbarNotification locale={locale} />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: "user" })}
              className="isoUser"
            >
              <TopbarUser locale={locale} user={this.props.user}/>
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    locale: state.LanguageSwitcher.language.locale,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
    user: state.Auth.currentUser
  }),
  { changeProperty, changeListing, toggleCollapsed }
)(Topbar);
