import React from 'react';
import settingsActions from '../../redux/settings/actions';
import { connect } from 'react-redux';
import Spin from '../Feedback/Spin/spin.style';
import Modal from '../../components/feedback/modal';
import Input, { Textarea } from '../../components/uielements/input';
import {
  Fieldset,
  Form,
  Label
} from './properties.style';
import clone from 'clone';

const { toggleContactModal, contactFormUpdate, sendContactMail } = settingsActions;

class ContactUs extends React.Component {
  componentDidMount() {
  }

  toggleContactModal = () => {
    const { toggleContactModal } = this.props;
    toggleContactModal();
  };

  onRecordChange = (key, event) => {
    let { contactForm } = clone(this.props);
    console.log("changin contactForm", contactForm);
    if (key) {
      contactForm[key] = event.target.value;
    }
    this.props.contactFormUpdate(contactForm);
  };

  onButtonClick = (contactForm) => {
    const { sendContactMail } = this.props;
    sendContactMail(contactForm);
  };

  render() {
    const {
      modalContactActive,
      user
    } = this.props;
    const { contactForm } = clone(this.props);

    if( user ) {
      contactForm.name = user.first_name + " " + user.last_name;
      contactForm.email = user.settings.email_address;
    }

    return (
      <div className="">
        <Modal
          visible={modalContactActive}
          onClose={this.toggleContactModal.bind(this)}
          title={'Contact Us'}
          okText={'Send'}
          onOk={this.onButtonClick.bind(this, contactForm)}
          onCancel={this.toggleContactModal.bind(this)}
        >
          <Spin spinning={this.props.loadingContacts} size="large">
            <Form>
              <Fieldset>
                <Label>Name</Label>
                <Input
                  label="Name"
                  placeholder="Name"
                  value={contactForm.name}
                  onChange={this.onRecordChange.bind(this, 'name')}
                />
              </Fieldset>
              <Fieldset>
                <Label>Email</Label>
                <Input
                  label="Email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={this.onRecordChange.bind(this, 'email')}
                />
              </Fieldset>
              <Fieldset>
                <Label>Phone</Label>
                <Input
                  label="Phone"
                  placeholder="Phone"
                  value={contactForm.phone}
                  onChange={this.onRecordChange.bind(this, 'phone')}
                />
              </Fieldset>
              <Fieldset>
                <Label>How many properties do you want to track?</Label>
                <Input
                  label="Properties"
                  placeholder="Properties"
                  value={contactForm.properties}
                  onChange={this.onRecordChange.bind(this, 'properties')}
                />
              </Fieldset>
              <Fieldset>
                <Label>How many competitors do you want to view?</Label>
                <Input
                  label="Competitors"
                  placeholder="Competitors"
                  value={contactForm.competitors}
                  onChange={this.onRecordChange.bind(this, 'competitors')}
                />
              </Fieldset>
              <Fieldset>
                <Label>Message (if any)</Label>
                <Textarea
                  placeholder="Property location, custom needs, etc."
                  value={contactForm.message}
                  onChange={this.onRecordChange.bind(this, 'message')}
                />
              </Fieldset>

            </Form>
          </Spin>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.Auth.currentUser,
    contactForm: state.Settings.contactForm,
    modalContactActive: state.Settings.modalContactActive,
    loadingContacts: state.Settings.loadingContacts
  };
}
export default connect(
  mapStateToProps,
  {
    toggleContactModal,
    contactFormUpdate,
    sendContactMail
  }
)(ContactUs);
