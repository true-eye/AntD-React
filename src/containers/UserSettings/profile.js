import React from 'react';
import settingsActions from '../../redux/settings/actions';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Spin from '../Feedback/Spin/spin.style';
import {
  Form,
  Label,
} from './properties.style';
import clone from 'clone';

const { saveUserProfile, userFormUpdate } = settingsActions;

class Profile extends React.Component {
  componentDidMount() {
    if(this.props.user){
      let { userForm } = clone(this.props);
      userForm.firstName = this.props.user.first_name;
      userForm.lastName = this.props.user.last_name;
      userForm.notificationEmail = this.props.user.settings.email_address;
      this.props.userFormUpdate(userForm);
    }
}

  componentWillReceiveProps(nextProps) {
    if(this.props.user !== nextProps.user && nextProps.user){
      let { userForm } = clone(this.props);
      userForm.firstName = nextProps.user.first_name;
      userForm.lastName = nextProps.user.last_name;
      userForm.notificationEmail = nextProps.user.settings.email_address;
      this.props.userFormUpdate(userForm);
    }
  }

  onRecordChange = (key, event) => {
    let { userForm } = clone(this.props);
    console.log("changin userForm", userForm);
    if (key) {
      userForm[key] = event.target.value;
    }
    this.props.userFormUpdate(userForm);
  };

  onButtonClick = (userForm) => {
    const { saveUserProfile } = this.props;
    console.log("saving", userForm);
    saveUserProfile(userForm);
  };

  render() {
    const { userForm } = clone(this.props);

    return (
      <div className="isoNoteTextbox">
        <div>
          <h3 className="isoWidgetLabel">
            Profile
          </h3>
        </div>

        <Form className="isoAlGridContents">
          <Spin spinning={this.props.loadingUser} size="large">
            <div>
              <Label>First Name</Label>
              <Input
                label="First Name"
                placeholder="First Name"
                value={userForm.firstName}
                onChange={this.onRecordChange.bind(this, 'firstName')}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                label="Last Name"
                placeholder="Last Name"
                value={userForm.lastName}
                onChange={this.onRecordChange.bind(this, 'lastName')}
              />
            </div>

            <div className="">
              <div>
                <Label>Notification Email</Label>
                <Input
                  label="Notification Email"
                  placeholder="Notification Email"
                  value={userForm.notificationEmail}
                  onChange={this.onRecordChange.bind(this, 'notificationEmail')}
                />
              </div>
            </div>

            <div className="isoInputWrapper">
              <div className="isoSelectButton">
                <button type="primary" className="ant-btn-primary ant-btn iChtnW" onClick={() => {this.onButtonClick(userForm)}}>Save Profile</button>
              </div>
            </div>
          </Spin>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.Auth.currentUser,
    userForm: state.Settings.userForm,
    loadingUser: state.Settings.loadingUser,
    userError: state.Settings.userError
  };
}
export default connect(
  mapStateToProps,
  {
    saveUserProfile,
    userFormUpdate
  }
)(Profile);
