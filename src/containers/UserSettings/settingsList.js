import React, { Component } from "react";
import { SettingsListWrapper } from "./settingsComponent.style";
import Scrollbars from "../../components/utility/customScrollBar.js";

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(id) {
    this.props.changeSetting(id, false);
  }
  render() {
    const { selectedSetting } = this.props;
    // const onChange = (id) => changeSetting(id);

    return (
      <SettingsListWrapper className="isoNoteListWrapper">
        <div className="isoNoteList">
          <Scrollbars>
            <div className={`isoList ${selectedSetting === "profile" ? "active" : ""}`}>
              <div
                className="isoNoteBGColor"
                style={{ width: "5px", background: '' }}
              />
              <div className="isoNoteText" onClick={() => this.onChange("profile")}>
                <h3>Profile Settings</h3>
              </div>
            </div>
            <div className={`isoList ${selectedSetting === "plan" ? "active" : ""}`}>
              <div
                className="isoNoteBGColor"
                style={{ width: "5px", background: '' }}
              />
              <div className="isoNoteText" onClick={() => this.onChange("plan")}>
                <h3>Plan Settings</h3>
              </div>
            </div>
            <div className={`isoList ${selectedSetting === "billing" ? "active" : ""}`}>
              <div
                className="isoNoteBGColor"
                style={{ width: "5px", background: '' }}
              />
              <div className="isoNoteText" onClick={() => this.onChange("billing")}>
                <h3>Billing</h3>
              </div>
            </div>
            <div className={`isoList ${selectedSetting === "property" ? "active" : ""}`}>
              <div
                className="isoNoteBGColor"
                style={{ width: "5px", background: '' }}
              />
              <div className="isoNoteText" onClick={() => this.onChange("property")}>
                <h3>Property Settings</h3>
              </div>
            </div>
          </Scrollbars>
        </div>
      </SettingsListWrapper>
    );
  }
}
